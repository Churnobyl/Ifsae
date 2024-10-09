from sqlalchemy import update, Table, Column, Integer, MetaData, case

from db.mongo import get_mongo_db
from db.maria import get_db

from models.rank import Rank
import datetime
from dateutil.relativedelta import relativedelta
from models.dog import Dog
from models.post import Post

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

def update_liked_dog_rank(rank_list):
    with get_mongo_db() as mongo:
        mongo.liked_dog_rank.update_one({}, {
            "$set": {"rank_list": rank_list}
        }, upsert=True)

def upsert_user_recommendation_rank(user_id, rank_list):
    if len(rank_list) != 100:
        raise ValueError('List Lenghth Error: rank_list must be 100 length')
    
    with get_db() as db:
        rows = db.query(Rank).filter(Rank.user_id == user_id).order_by(Rank.ranking).all()
        if len(rows) > 0:
            update_values = [
                {"id": rank.id, "ranking": rank.ranking, "user_id": user_id, "dog_id": rank_list[rank.ranking - 1]['dog_id']}
                for rank in rows
            ]
            db.bulk_update_mappings(Rank, update_values)
        else:
            values = [
                {"ranking": i+1, "user_id": user_id, "dog_id": rank['dog_id']}
                for i, rank in enumerate(rank_list)
            ]
            print(values)
            db.bulk_insert_mappings(Rank, values)
        
        db.commit()
    
def insert_dog_character_score(dog_data):
    with get_mongo_db() as mongo:
        mongo.dog_character.insert_one(dog_data)    
    
def insert_user_character_rank_to_mongo(final_data):
    with get_mongo_db() as mongo:
        mongo.user_character_rank.insert_one(final_data)
    
def delete_old_data():
    three_years_ago = datetime.datetime.now() - relativedelta(years=3)
    with get_mongo_db() as mongo:
        mongo.test.delete_many({'happenDt': {'$lt': three_years_ago.strftime('%Y%m%d')}})
    
def insert_dog(dog):
    with get_db() as db:
        db.add_all(dog)
        db.commit()
        
def update_dog(dog):
    with get_db() as db:
        db.bulk_update_mappings(Dog, dog)
        db.commit()

def insert_shelter(shelter):
    with get_db() as db:
        db.add_all(shelter)
        db.commit()

def insert_shelter_dog(shelter_dog):
    with get_db() as db:
        db.add_all(shelter_dog)
        db.commit()
        
def insert_post(post):
    with get_db() as db:
        db.add(post)
        db.commit()
        
def insert_post_dog(post_dog):
    with get_db() as db:
        db.add(post_dog)
        db.commit()
        
def update_post(post):
    with get_db() as db:        
        db_post = db.query(Post).filter(Post.id == post.id).first()
        db_post.title = post.title
        db_post.content = post.content
        db_post.shelter_id = post.shelter_id
        db_post.video_url = post.video_url
        db_post.thumbnail_url = post.thumbnail_url        
        db.commit()
    
# def update_dog_species(dog, dog_species):
#     with get_db() as db:        
#         db_dog = db.query(Dog).filter(Dog.id == dog.id).first()
#         db_dog.species = dog_species
#         db.commit()