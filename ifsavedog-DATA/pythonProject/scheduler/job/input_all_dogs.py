from service.insert_dog_datas import *
from db.maria import *
import pandas as pd


def input_all_dogs():
  db = next(get_db())
  df = preprocess_data(get_data())
  if is_exist_data(db, df):
    print("exist data")
    return
  else:
    return insert_data_to_sql(db, df)