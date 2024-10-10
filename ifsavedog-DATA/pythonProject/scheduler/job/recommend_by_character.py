from service.insert_dog_datas import *
from service.calculate_character import *
from service.get_datas import *
from service.select_dog_by_character import *
from service.set_datas import *

def calculate_dog_character_score(user_id_list):  
  for user_id in user_id_list:
    survey_data = get_user_character_survey(user_id)      
    if isExistData(survey_data):
      dog_vector_data = get_dog_vector_data()
      user_dataset, dog_dataset = make_dataframe(survey_data, dog_vector_data)
      final_data = rank_dog_by_character(dog_dataset, user_dataset)    
      insert_user_character_rank_to_mongo(final_data)      
    else:      
      continue
    

  
    
