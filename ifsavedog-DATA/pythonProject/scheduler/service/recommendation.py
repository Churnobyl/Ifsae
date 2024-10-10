from service.get_datas import *

from service.set_datas import upsert_user_recommendation_rank
from service.parameters import *

config = {
    "algorithm": [
        {
            "max": 10,
            "start": 80,
            "steepness": 0.2,
        },
        {
            "max": 20,
            "start": 80,
            "steepness": 0.18,
        },
        {
            "max": 50,
            "start": 0,
            "steepness": 0.08,
        },
        {
            "max": 45,
            "start": 0,
            "steepness": 0.05,
        },
        {
            "max": 60,
            "start": 0,
            "steepness": 0.06,
        }
    ]
}

def insert_recommendation_rank(user_id, index=0,image_vector_rank_=None):
    global config
    liked_num = len(get_user_rating(user_id))
    # TODO: modify parameters
    ws = np.int32(np.round(proportion(get_parameters(liked_num, config=config)[:4])*100))
    print(user_id)
    print(ws, liked_num)
    if len(ws) < 100:
        ws[0] += (100 - ws.sum())
    
    image_vector_rank = []
    if image_vector_rank_ == None and liked_num > 0:
        image_vector_rank = get_image_vector_rank(user_id=user_id)['rank_list']
    else:
        image_vector_rank = image_vector_rank_
        
    
    character_rank = get_character_rank(user_id=user_id)
    if character_rank is None:
        ws[3] = 0
        ws[0] += (100 - ws.sum())
    else:
        character_rank = character_rank['rank_list']
    latest_rank = get_latest_dog_rank()['rank_list']
    # liked_rank = get_liked_dog_rank()['rank_list']
    # liked_rank_num = len(liked_rank)
    result_list = []
    
    # result 넣기
    # TODO: ws 합치는거 수정하기. liked 2000개 쌓이면 풀어주기
    result_list.extend(latest_rank[index*(ws[0]+ws[1]):(index+1)*(ws[0]+ws[1])])
    # result_list.extend(liked_rank[index*ws[1]:(index+1)*ws[1]])
    if ws[2] > 0:
        result_list.extend(image_vector_rank[index*ws[2]:(index+1)*ws[2]])
    if ws[3] > 0 and character_rank is not None:
        result_list.extend(character_rank[index*ws[3]:(index+1)*ws[3]])
    
    if len(result_list) != 100:
        raise ValueError(f'not length 100 : {len(result_list)=}')

    # print(result_list)
    upsert_user_recommendation_rank(user_id=user_id, rank_list=result_list)


def random_rank(user_id):
    result_list = [{"dog_id": i.id, "desertion_no": i.desertion_no} for i in get_random_n_dogs(100)]

    upsert_user_recommendation_rank(user_id, result_list)


def recommedate(user_id_list):
    for user_id in user_id_list:
        insert_recommendation_rank(user_id=user_id)