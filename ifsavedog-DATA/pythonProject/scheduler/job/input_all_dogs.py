from service.insert_dog_datas import *
from db.maria import *
from service.set_datas import *
from service.get_datas import *

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
    print(desertion_no)
    if get_dog_data_by_desertion_no(desertion_no):
      dog['id'] = get_dog_data_by_desertion_no(desertion_no).id
      result_update_dog.append(dog)
    else:  
      dog = Dog(**dog)
      result_new_dog.append(dog)
  update_dog(result_update_dog)
  insert_dog(result_new_dog)

  