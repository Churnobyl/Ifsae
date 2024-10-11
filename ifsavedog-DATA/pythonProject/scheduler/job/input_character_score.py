from service.insert_dog_datas import *
from service.calculate_character import *
from db.mongo import *
from service.get_datas import *

def calculate_dog_character_score(new_image_vector_list):        
  list = make_score_id_list(new_image_vector_list)
  results = score_exponential(list)
  final = calculate_character_score(results)
  insert_to_mongo_character_score(final)