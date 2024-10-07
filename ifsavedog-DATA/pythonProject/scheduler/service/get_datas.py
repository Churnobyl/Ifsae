from db.mongo import get_mongo_db
from db.maria import get_db

from models.dog import Dog
from models.user import User, UserSurvey
from models.rating import Rating

def get_all_users():
    with get_db() as db:
        return db.query(User).all()

def get_all_image_vector():
    with get_mongo_db() as mongo:
        return mongo.dog_image_vector.find().to_list()

def get_all_rating():
    with get_db() as db:
        return db.query(Rating).all()

def get_user_rating(user_id):
    with get_db() as db:
        return db.query(Rating).filter(Rating.user_id == user_id).all()

def get_dog_image_vectors_list(dog_list):
    with get_mongo_db() as mongo:
        return mongo.dog_image_vector.find(dog_list).to_list()

def get_dogs_by_date(date):
    with get_db() as db:
        return db.query(Dog).filter(Dog.happen_dt == date).all()

def get_dogs_by_date_list(date_list):
    with get_db() as db:
        return db.query(Dog).filter(Dog.happen_dt.in_(date_list)).all()

def get_dogs_ordered_by_date(num):
    with get_db() as db:
        return db.query(Dog).order_by(Dog.happen_dt.desc()).limit(num).all()

def get_dogs_boot(strform):
    with get_db() as db:
        return db.query(Dog).filter(Dog.happen_dt.contains(strform)).all()

def get_user_prefer_image_vector(user_id):
    with get_mongo_db() as mongo:
        return mongo.user_image_vector.find_one({"user_id": user_id})

def get_dog_image_vector(desertionNo):
    with get_mongo_db() as mongo:
        return mongo.dog_image_vector.find_one({"desertionNo": desertionNo})

def get_dog_vector_data():
    with get_mongo_db() as mongo:
        return mongo.dog_character.find()

def get_user_character_survey(user_id):
    with get_db() as db:
        return db.query(UserSurvey).filter(UserSurvey.user_id == user_id).first()

def get_image_vector_rank(user_id):
    with get_mongo_db() as mongo:
        return mongo.user_image_vector_rank.find_one({"user_id": user_id})

def get_character_rank(user_id):
    with get_mongo_db() as mongo:
        return mongo.user_character_rank.find_one({"user_id": user_id})

def get_latest_dog_rank():
    with get_mongo_db() as mongo:
        return mongo.latest_dog_rank.find_one({})

def get_liked_dog_rank():
    return get_mongo_db().liked_dog_rank.find_one({})
    
# collection 으로부터 이미지벡터 데이터를 가져옴
def get_image_data():
  return get_mongo_db.dog_image_vector.find({},{"_id": 0, "id": 1, "image_vector": 1, "desertion_no": 1})

def get_breed_score():
    return get_mongo_db().breed_score.find()

def get_dog_character_by_id(id):
    return get_mongo_db().dog_character.find_one({"id": id})
    