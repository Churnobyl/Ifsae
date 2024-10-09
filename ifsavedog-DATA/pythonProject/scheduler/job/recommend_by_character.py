from service.insert_dog_datas import *
from service.calculate_character import *
from db.mongo import *
from service.get_datas import *
from service.select_dog_by_character import *

def calculate_dog_character_score():  
  db = get_mongo_db()
  survey_data = get_user_character_survey(19)
  dog_data = get_dog_vector_data() 
   
  user_dataset, dog_dataset = make_dataframe(survey_data, dog_data)
  final_data = rank_dog_by_character(db, dog_dataset, user_dataset)
  insert_user_character_rank_to_mongo(db, final_data)
  
    
