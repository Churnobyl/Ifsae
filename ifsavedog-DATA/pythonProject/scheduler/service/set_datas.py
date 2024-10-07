from sqlalchemy import update, Table, Column, Integer, MetaData, case

from db.mongo import get_mongo_db
from db.maria import get_db

from models.rank import Rank

def insert_dog_image_vector(dog_vector_list):
    with get_mongo_db() as mongo:
        mongo.dog_image_vector.insert_many(dog_vector_list)

def update_user_prefer_vector(user_id, prefer_rank_list):
    with get_mongo_db() as mongo:
        mongo.user_image_vector_rank.update_one(
        {"user_id": user_id},
        {
            "$set": {
                "rank_list": prefer_rank_list
            }
        }, upsert=True)
    
def update_latest_dog_rank(rank_list):
    with get_mongo_db() as mongo:
        mongo.latest_dog_rank.update_one({}, {
            "$set": {"rank_list": rank_list}
            }, upsert=True)

def upsert_user_recommendation_rank(user_id, rank_list):
    if len(rank_list) != 100:
        raise ValueError('List Lenghth Error: rank_list must be 100 length')
    
    with get_mongo_db() as mongo:  
        rows = mongo.query(Rank).filter(Rank.user_id == user_id).order_by(Rank.ranking).all()
        if len(rows) > 0:
            update_values = [
                {"id": rank.id, "ranking": rank.ranking, "user_id": user_id, "dog_id": rank_list[rank.ranking - 1]['dog_id']}
                for rank in rows
            ]
            mongo.bulk_update_mappings(Rank, update_values)
        else:
            values = [
                {"ranking": i+1, "user_id": user_id, "dog_id": rank['dog_id']}
                for i, rank in enumerate(rank_list)
            ]
            print(values)
            mongo.bulk_insert_mappings(Rank, values)
        
        mongo.commit()
