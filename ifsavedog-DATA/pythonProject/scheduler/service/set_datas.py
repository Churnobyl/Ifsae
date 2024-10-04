from db.mongo import get_mongo_db
from db.maria import get_db


def update_user_prefer_vector(user_id, prefer_rank_list):
    try:
        get_mongo_db.user_image_vector_rank.update(
        {"user_id": user_id},
        {
            "user_id": user_id,
            "rank_list": prefer_rank_list
        }, upsert=True)
    except:
        print('error')
