from service.insert_dog_datas import *
from db.maria import *
from service.set_datas import *
from service.get_datas import *
from models.shelter import *
from models.shelter_dog import *
import pandas as pd

def input_all_dogs(start_date, end_date):
  # 3년 이상 데이터 삭제
  delete_old_data()
  # API를 통해 데이터 가져온 후 전처리
  df = preprocess_data(get_API_data(start_date, end_date))
  
  # desertion_no로 데이터 존재유무 확인 후 있으면 update 없으면 삽입
  result_update_dog = []
  result_new_dog = []
  for _, row in df.iterrows():
    desertion_no = row['desertion_no']    
    dog = row.to_dict()
    if get_dog_data_by_desertion_no(desertion_no):
      dog['id'] = get_dog_data_by_desertion_no(desertion_no).id
      result_update_dog.append(dog)
    else:  
      dog = Dog(**dog)
      result_new_dog.append(dog)
  # update_dog(result_update_dog)
  insert_dog(result_new_dog)
  
  
def input_all_shelters():  
  
  data = get_api_data_from_mongo()
  df = pd.DataFrame(data)
  df_unique = df.drop_duplicates(subset=['careNm'])
  final_data = df_unique[['careNm', 'careAddr', 'careTel', 'orgNm']]
  
  shelter_list = []
  for _, row in final_data.iterrows():
    shelter = Shelter(
      name = row['careNm'],
      address = row['careAddr'],
      phone = row['careTel'],
      content = row['careAddr'] + '에 위치한 유기견 보호소입니다.'
    )
    shelter_list.append(shelter)
    print(shelter.name)
  insert_shelter(shelter_list)    
  
def match_shelter_dog():
  row_data = get_api_data_from_mongo()
  dog_data = get_all_dogs()
  shelter_data = get_all_shelters()
  
  df = pd.DataFrame(row_data)
  mongo_data = df[['desertionNo','careNm']]
  
  shelter_list = []  
  for row in shelter_data:    
    shelter_list.append(row.name)
  
  final_input_data_list=[]
  for row in dog_data:    
    dog_desertion_no = row.desertion_no
    dog_id = row.id
    if get_shelter_dog_by_dog_id(dog_id):
      continue
    for _, row2 in mongo_data.iterrows():      
      desertion_no = row2['desertionNo']
      careNm = row2['careNm']         
      # DB에 있는 강아지의 no와 API에서 가져온 no가 동일하면 실행
      if dog_desertion_no == desertion_no:
        for row3 in shelter_list:
          shelter_name = row3
        # API에서 가져온 위의 no의 보호소 이름과 DB의 보호소 이름이 동일하면 실행
          if shelter_name == careNm:            
            # print(desertion_no, shelter_name)
            shelter_id = get_shelter_by_careNm(careNm).id
            final_data = Shelter_Dog(
              dog_id = dog_id,
              shelter_id = shelter_id
            )
            final_input_data_list.append(final_data)            
            break          
        print(dog_id, shelter_id)
          
      # break
    if row.id == 2000 : break
  # print(final_input_data_list)
  insert_shelter_dog(final_input_data_list)

    
    
    
    
    
    