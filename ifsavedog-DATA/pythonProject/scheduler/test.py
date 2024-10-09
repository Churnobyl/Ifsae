from service.get_datas import *
from job.makes_movie import *
from job.recommend_by_character import *
from job.input_all_datas import *

dogs = get_all_dogs()
for dog in dogs:
  dog = get_dog_by_id(36)
  input_post_datas_and_match_post_dog(dog)
  if dog.id == 120: break
