from contextlib import contextmanager
from pymongo import MongoClient
from settings import config

mongo_url = config.MONGO_URL
db_name = config.MONGO_DBNAME
# MongoDB 클라이언트 생성

client = MongoClient(mongo_url)
# 데이터베이스와 컬렉션 선택
db = client[db_name]

def get_mongo_db():
    return db

def close_mongo_client():
    client.close()