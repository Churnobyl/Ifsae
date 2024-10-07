from service.insert_dog_datas import *
from service.calculate_character import *
from db.mongo import *
from service.get_datas import *

def calculate_dog_character_score():    
  result = get_image_data()   
  list = make_score_id_list(result)
  results = score_exponential(list)
  final = calculate_character_score(results)
  insert_to_mongo_character_score(final)