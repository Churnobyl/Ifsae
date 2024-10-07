from service.set_datas import *

def insert_image_vector_rank(user_id, rank_sorted_list):
    rank_list = [{"dog_id": i[0], "desertion_no": i[1], "similarity": i[2].item()} for i in rank_sorted_list]
    update_user_prefer_vector(user_id, rank_list)

def insert_latest_rank(latest_list):
    rank_list = [{"dog_id": i.id, "desertion_no": i.desertion_no, "happen_dt": i.happen_dt} for i in latest_list]
    update_latest_dog_rank(rank_list)