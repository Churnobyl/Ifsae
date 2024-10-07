from service.get_datas import *
from service.user_preference import *
from service.insert_rank_values import *

def set_preference_image_vector():
    users = get_all_users()
    for user in users:
        pass

def rank_image_vector_by_user(id): #이름 바꿔야함, 파라미터 없애기
    rank_list = rank_cos_similarity(id)
    print('got rank_list')
    insert_image_vector_rank(id, rank_list)
    
def rank_image_vector():
    user_list = get_all_users()
    dog_image_vectors = get_all_image_vector()
    
    for user in user_list:
        rank_list = rank_cos_similarity(user.id, dog_image_vectors)
        if rank_list == None:
            continue
        insert_image_vector_rank(user.id, rank_list)
