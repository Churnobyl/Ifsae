from db.mongo import get_mongo_db
from db.maria import get_db

from models.dog import Dog
from models.user import User, UserSurvey
from models.rating import Rating

def get_all_users():
    return next(get_db()).query(User).all()

def get_all_image_vector():
    return get_mongo_db().dog_image_vector.find().to_list()

def get_all_rating():
    return next(get_db()).query(Rating).all()

def get_user_rating(user_id):
    return next(get_db()).query(Rating).filter(Rating.user_id == user_id).all()

def get_dog_image_vectors_list(dog_list):
    return get_mongo_db().dog_image_vector.find(dog_list).to_list()

def get_dogs_by_date(date):
    return next(get_db()).query(Dog).filter(Dog.happen_dt == date).all()

def get_dogs_by_date_list(date_list):
    return next(get_db()).query(Dog).filter(Dog.happen_dt.in_(date_list)).all()

def get_dogs_ordered_by_date(num):
    return next(get_db()).query(Dog).order_by(Dog.happen_dt).limit(num).all()

def get_dogs_boot(strform):
    return next(get_db()).query(Dog).filter(Dog.happen_dt.contains(strform)).all()

def get_user_prefer_image_vector(user_id):
    return get_mongo_db().user_image_vector.find_one({"user_id": user_id})

def get_dog_image_vector(desertionNo):
    return get_mongo_db().dog_image_vector.find_one({"desertionNo": desertionNo})

def get_dog_vector_data():
    db = get_mongo_db()
    return db.dog_character.find()

def get_user_character_survey(user_id):
    return next(get_db()).query(UserSurvey).filter(UserSurvey.user_id == user_id).first()

def get_image_vector_rank(user_id):
    return get_mongo_db().user_image_vector_rank.find_one({"user_id": user_id})

def get_character_rank(user_id):
    return get_mongo_db().user_character_rank.find_one({"user_id": user_id})

def get_latest_dog_rank():
    return get_mongo_db().latest_dog_rank.find_one({})
    