from service.get_datas import *

from service.set_datas import update_user_recommendation_rank

def insert_recommendation_rank(user_id):
    # TODO: modify parameters
    ws = []
    
    image_vector_rank = get_image_vector_rank(user_id=user_id)
    character_rank = get_character_rank(user_id=user_id)
    
    result_list = []
    update_user_recommendation_rank()