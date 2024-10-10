from service.get_datas import *
from job.makes_movie import *
from job.recommend_by_character import *
from job.input_all_datas import *
from job.input_user import *

# match_shelter_user()  

# make_user()

start_processing = False
dogs = get_all_dogs()
for dog in dogs:
  if dog.id == 7674:
        start_processing = True

  if start_processing:
      input_post_datas_and_match_post_dog(dog)
      print(dog.id)
