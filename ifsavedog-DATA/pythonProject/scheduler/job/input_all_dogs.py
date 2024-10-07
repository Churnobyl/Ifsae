from service.insert_dog_datas import *
from db.maria import *
from service.set_datas import *
from service.get_datas import *
def input_all_dogs(start_date, end_date):
  db = next(get_db())
  delete_old_data()
  df = preprocess_data(get_API_data(start_date, end_date))  
  for _, row in df.iterrows():
    desertion_no = row['desertion_no']
    if get_dog_data_by_desertion_no(desertion_no):
      return
    else:  
      make_data_sqlform(row)
      dog = Dog(**row)

  