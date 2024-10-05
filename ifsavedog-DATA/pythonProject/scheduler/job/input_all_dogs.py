from service.insert_dog_datas import *
from db.maria import *
def input_all_dogs():
  db = next(get_db())
  df = preprocess_data(get_data())  
  return insert_data_to_sql(db, df)