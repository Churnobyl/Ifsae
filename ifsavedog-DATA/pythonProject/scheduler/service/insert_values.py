from service.set_datas import *

def insert_image_vector_rank(user_id, rank_sorted_list):
    rank_list = [{"dog_id": i[0], "desertion_no": i[1], "similarity": i[2].item()} for i in rank_sorted_list]
    print(rank_list)
    update_user_prefer_vector(user_id, rank_list)