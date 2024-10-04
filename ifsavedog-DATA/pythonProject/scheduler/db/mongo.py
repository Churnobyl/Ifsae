import os
from pymongo import MongoClient

mongo_url = os.getenv('MONGO_URL')
db_name = os.getenv('MONGO_DBNAME')    
serviceKey = os.getenv('SERVICE_KEY')

# MongoDB 클라이언트 생성

client = MongoClient(mongo_url)
# 데이터베이스와 컬렉션 선택
db = client[db_name]

def get_mongo_db():
    return db
