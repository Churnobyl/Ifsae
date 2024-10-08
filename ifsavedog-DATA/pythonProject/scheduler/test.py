from db.maria import get_db
from job.dog_image import *
from service.get_datas import *
from job.makes_movie import *
from job.recommend_by_character import *
from job.input_all_datas import *
from models.shelter import *

# # shelter data 넣음
# input_all_shelters()

# match_shelter_dog()
make_movie()

# input_all_dogs(20241003, 20241003)
# image_name = 'KakaoTalk_20241007_134037647.jpg'
# make_movie(image_name)
# user_list = {19,1,29}
# calculate_dog_character_score(user_list)
# print(get_all_users())
# download_dog_image_boot('2024070')