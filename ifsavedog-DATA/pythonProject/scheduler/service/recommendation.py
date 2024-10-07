from service.get_datas import *

from service.set_datas import upsert_user_recommendation_rank

def insert_recommendation_rank(user_id, index=0,image_vector_rank_=None):
    
    liked_num = len(get_user_rating(user_id))
    # TODO: modify parameters
    ws = [20, 20, 59, 1]
    
    image_vector_rank = []
    if image_vector_rank_ == None and liked_num > 0:
        image_vector_rank = get_image_vector_rank(user_id=user_id)
    else:
        image_vector_rank = image_vector_rank_
        
    
    character_rank = get_character_rank(user_id=user_id)
    latest_rank = get_latest_dog_rank()['rank_list']
    liked_rank = get_liked_dog_rank()['rank_list']
    result_list = []
    
    # result 넣기
    result_list.extend(image_vector_rank[index*ws[0]:(index+1)*ws[0]])
    result_list.extend(character_rank[index*ws[1]:(index+1)*ws[1]])
    result_list.extend(latest_rank[index*ws[2]:(index+1)*ws[2]])
    result_list.extend(liked_rank[index*ws[3]:(index+1)*ws[3]])
    # print(result_list)
    upsert_user_recommendation_rank(user_id=user_id, rank_list=result_list)