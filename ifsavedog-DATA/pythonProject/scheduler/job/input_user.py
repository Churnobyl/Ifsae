from models.user import User
from models.shelter import *
from random import randint
from service.get_datas import *
from service.set_datas import *

def match_shelter_user():
  shelters = get_all_shelters()
  user_id = 81
  for shelter in shelters:
    shelter_id = shelter.id    
    shelter_user = Shelter_User(
        shelter_id=shelter_id,
        user_id=user_id
    )
    insert_shelter_user(shelter_user)
    # print(user_id)
    user_id+=1
    
def make_user():
    for i in range(1,500):
        user = User(
            grade = 0,
            role=1,
            user_status=1,
            email=f"shelter{i}@naver.com",
            nickname=f"shelter{i}",
            password="123!",
            profile_img_url=f"image/center/center_img{randint(1, 9)}.png"
        )
        insert_user(user)
        