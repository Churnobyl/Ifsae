from pymongo import MongoClient
from transformers import AutoImageProcessor, AutoModelForImageClassification
import torch
from PIL import Image
from io import BytesIO
from dotenv import load_dotenv
import os

import requests
import pandas as pd

# 강아지별 특성 점수 계산하여 저장하는 함수
def calculate_character_score():
  load_dotenv()
  mongo_url = os.getenv('MONGO_URL')
  db_name = os.getenv('MONGO_DBNAME')
  
  # MongoDB 클라이언트 생성
  client = MongoClient(mongo_url)
  # 데이터베이스와 컬렉션 선택
  db = client[db_name]
  collection = db['test']

  result = collection.find({"happenDt" : "20240930", "species" : "개"},{"_id" : 0, "popfile":1, "desertionNo":1})

  final_df = pd.DataFrame()
  for i in result:
    image_path = i['popfile']
    print(image_path)
    
    response = requests.get(image_path)
    try:
      image = Image.open(BytesIO(response.content))
      image = image.convert("RGB")
      image = image.resize((224, 224))
    except Exception as e:
      print(f"Error processing image {image_path}: {e}")
      continue
      
    image_processor = AutoImageProcessor.from_pretrained("wesleyacheng/dog-breeds-multiclass-image-classification-with-vit")
    model = AutoModelForImageClassification.from_pretrained("wesleyacheng/dog-breeds-multiclass-image-classification-with-vit")
    inputs = image_processor(image, return_tensors="pt")

    with torch.no_grad():
        logits = model(**inputs).logits
        
      # score와 id를 받는 리스트 생성
    score_id_list = [(score.item(), i) for i, score in enumerate(logits[0])]

    # score를 기준으로 내림차순 정렬
    score_id_list.sort(key=lambda x: x[0], reverse=True)
    df = pd.DataFrame(score_id_list, columns=['Score', 'ID'])
    df["Label"] = df["ID"].apply(lambda x: model.config.id2label[x])
    df["minmax"] = (df["Score"] - df["Score"].min()) / (df["Score"].max() - df["Score"].min())
    df["exponential"] = df["Score"].apply(lambda x: (2.71828182845904523536028747135266249775724709369995 ** (x)) - 1)

    df_top_5_scores = df.nlargest(5, 'Score')
    df["percentile"] = df_top_5_scores["exponential"] / df_top_5_scores["exponential"].sum()

    # 견종별 점수를 불러와서 df_scoring DataFrame에 저장
    collection = db['breed_score']
    df_scoring = pd.DataFrame(list(collection.find()))    

    df["Label"] = df["Label"].str.lower()
    df_scoring["견종"] = df_scoring["견종"].str.lower()

    # df와 df_scoring을 견종/Label 기준으로 상위 5개만 병합  
    merged_df = pd.merge(df.nlargest(5, 'Score'), df_scoring, left_on="Label", right_on="견종")
    
    # 병합된 DataFrame에서 계산 수행
    merged_df["운동 강도"] = (merged_df["운동 강도"] * merged_df["percentile"]).sum()
    merged_df["짖는 정도"] = (merged_df["짖는 정도"] * merged_df["percentile"]).sum()
    merged_df["털 관리 정도"] = (merged_df["털 관리 정도"] * merged_df["percentile"]).sum()
    merged_df["크기"] = (merged_df["크기"] * merged_df["percentile"]).sum()
    merged_df["공동생활"] = (merged_df["공동생활"] * merged_df["percentile"]).sum()
    merged_df["운동 요구량"] = (merged_df["운동 요구량"] * merged_df["percentile"]).sum()
    merged_df["훈련 용이성"] = (merged_df["훈련 용이성"] * merged_df["percentile"]).sum()
    merged_df["아이와의 친화력"] = (merged_df["아이와의 친화력"] * merged_df["percentile"]).sum()

    new_data = merged_df[['운동 강도', '짖는 정도', '털 관리 정도', '크기', '공동생활', '운동 요구량', '훈련 용이성', '아이와의 친화력']].iloc[0].to_frame().T  
    new_data.insert(0, 'desertionNo', i['desertionNo'])  

    final_df = pd.concat([final_df, new_data], ignore_index = True)

  collection = db['dog_character']
  data = final_df.to_dict('records')

  for record in data:
      collection.replace_one({'desertionNo': record['desertionNo']}, record, upsert=True)
      
