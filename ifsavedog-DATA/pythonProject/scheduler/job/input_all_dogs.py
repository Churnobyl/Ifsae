from service.insert_dog_datas import *
from db.maria import *
def input_all_dogs(start_date, end_date):
  db = next(get_db())
  delete_data()
  df = preprocess_data(get_data(start_date, end_date))  
  return insert_data_to_sql(db, df)