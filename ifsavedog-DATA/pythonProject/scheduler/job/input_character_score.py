from service.insert_dog_datas import *
from service.calculate_character import *
from db.mongo import *

def calculate_dog_character_score():  
  db = get_mongo_db()
  result = get_image_data(db['dog_image_vector']) 
  
  list = make_score_id_list(result)
  results = score_exponential(list)
  final = calculate_character_score(db, results)
  insert_to_mongo_character_score(db, final)