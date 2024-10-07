from contextlib import contextmanager
from pymongo import MongoClient
from settings import config

mongo_url = config.MONGO_URL
db_name = config.MONGO_DBNAME
# MongoDB 클라이언트 생성

@contextmanager
def get_mongo_db():
    client = MongoClient(mongo_url)
    # 데이터베이스와 컬렉션 선택
    db = client[db_name]
    try:
        yield db
    finally:
        client.close()
