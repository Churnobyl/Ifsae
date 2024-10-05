from service.get_datas import *
from service.user_preference import *
from service.insert_values import *

def set_preference_image_vector():
    users = get_all_users()
    for user in users:
        pass

def rank_image_vector(id): #이름 바꿔야함, 파라미터 없애기
    rank_list = calc_cos_similarity(id)
    insert_image_vector_rank(29, rank_list)