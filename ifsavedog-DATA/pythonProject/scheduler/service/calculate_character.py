from service.get_datas import *
from service.set_datas import *
from constant_value import *
import pandas as pd
import numpy as np

# 이미지벡터 데이터를 score_id_list로 변환
def make_score_id_list(result):
  score_id_list =[]  
  for document in result:
    id = document['id']
    desertion_no = document['desertion_no']
    image_vector = document['image_vector']    
    score_idx_list = ([(score, idx) for idx, score in enumerate(image_vector)])
    
    score_id_list.append({
      'id': id,
      'desertion_no': desertion_no,
      'scores': score_idx_list
    })
  return score_id_list     

# 유사도의 가중치를 주어 견종별 점수를 계산
def score_exponential(score_id_list):
    results = []
    for entry in score_id_list:
      id = entry['id']
      desertion_no = entry['desertion_no']
      scores = entry['scores']
      
      df = pd.DataFrame(scores, columns=['Score', 'ID'])
      df = df.sort_values(by='Score', ascending=False)
      df['id'] = id
      df['desertion_no'] = desertion_no
      df["Label"] = df["ID"].apply(lambda x: dog_label[x])
      
      
      df["minmax"] = (df["Score"] - df["Score"].min()) / (df["Score"].max() - df["Score"].min())
      df["exponential"] = df["Score"].apply(lambda x: np.exp(x) - 1)
      df_top_5_scores = df.nlargest(5, 'Score')
      df["percentile"] = df_top_5_scores["exponential"] / df_top_5_scores["exponential"].sum()
      results.append(df)
    return results

# 이미지의 유사도를 이용해 강아지의 특성별 점수를 계산
def calculate_character_score(results):
    data = get_breed_score()
    df_scoring = pd.DataFrame(list(data))    

    df_scoring["견종"] = df_scoring["견종"].str.lower()
    
    final_results = []    
    for df in results:
      df["Label"] = df["Label"].str.lower()
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
      new_data.insert(0, 'id', df['id'])  
      new_data.insert(1, 'desertion_no', df['desertion_no'])  
      
      final_results.append(new_data)

    final_df = pd.concat(final_results, ignore_index=True)
    
    return final_df
  
# 계산된 특성별 점수를 MongoDB에 삽입
def insert_to_mongo_character_score(final_df):        
    for index,row in final_df.iterrows():
        try:
            id = int(row['id'])            
            existing_data = get_dog_character_by_id(id)
            # id가 존재하지 않으면 데이터 삽입
            if existing_data is None:       
              insert_dog_character_score(row.to_dict())              
            else:
              print(f"Data with id {row['id']} already exists, skipping.")
        except Exception as e:
          print(f"Error processing id{row['id']}: {e}")