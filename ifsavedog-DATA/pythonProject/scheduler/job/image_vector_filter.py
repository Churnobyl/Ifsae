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
    
def rank_image_vector(user_ids_list):
    dog_image_vectors = get_all_image_vector()
    
    for user_id in user_ids_list:
        rank_list = rank_cos_similarity(user_id, dog_image_vectors)
        if rank_list == None:
            continue
        insert_image_vector_rank(user_id, rank_list)
