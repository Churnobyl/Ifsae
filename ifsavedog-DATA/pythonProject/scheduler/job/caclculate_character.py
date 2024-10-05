from service.insert_dog_datas import *
from db.maria import *
from db.mongo import *
import pandas as pd

def get_all_image_vector():
    return get_mongo_db().dog_image_vector.find().to_list()

def input_all_dogs():
  db = next(get_db())
  df = preprocess_data(get_data())
  if is_exist_data(db, df):
    print("exist data")
    return
  else:
    return insert_data_to_sql(db, df)