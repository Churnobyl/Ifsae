from db.mongo import get_mongo_db
from db.maria import get_db

from models.user import User
from models.rating import Rating

def get_all_users():
    return next(get_db()).query(User).all()

def get_all_image_vector():
    return get_mongo_db().dog_image_vector.find().to_list()

def get_user_rating(user_id):
    return next(get_db()).query(Rating).filter(Rating.user_id == user_id).all()

def get_dog_image_vectors_list(dog_list):
    return get_mongo_db().dog_image_vector.find([dog_list]).to_list()


def get_user_prefer_image_vector(user_id):
    return get_mongo_db().user_image_vector.find_one({"user_id": user_id})

def get_dog_image_vector(desersionNo):
    return get_mongo_db().dog_image_vector.find_one({"desertionNo": desersionNo})