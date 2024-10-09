## 유저의 평가 데이터를 기반으로 전체 유기견의 순위를 매기고 mongoDB에 결과를 저장하는 코드 ##
from pymongo import MongoClient
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import os
import numpy as np

import requests
import pandas as pd

from db.maria import get_db
from models.user import UserSurvey

# env 파일 로드
load_dotenv()
mongo_url = os.getenv('MONGO_URL')
db_name = os.getenv('MONGO_DBNAME')    

db = get_db()
specific_prefs = next(db).query(UserSurvey).filter_by(user_id = 19).all()
df_user = pd.DataFrame([u.__dict__ for u in specific_prefs])

# MongoDB 클라이언트 생성
client = MongoClient(mongo_url)
## 유기견 별 점수 계산 시작 ##
# 불러올 유기견 데이터베이스와 컬렉션 선택
db = client[db_name]
collection = db['dog_character']

result = collection.find()
df = pd.DataFrame(list(result)) # 불러온 자료를 dataFrame으로 변환

weight = {
    "운동 강도": 1.2,
    "짖는 정도": 1.2,
    "털 관리 정도": 1.3,
    "크기": 1.4,
    "공동생활" : 1.2,
    "운동 요구량" : 1.3,
    "훈련 용이성" : 1.4,
    "아이와의 친화력" : 1.5
}

print(df.columns)
print(df_user.columns)

def calculate_weighted_euclidean_distance(row, df_user, weight):
    # 각 항목에 대해 가중치를 적용한 거리 계산
    distance = np.sqrt(
        (weight["운동 강도"] * (row["운동 강도"] - df_user["exercise_level"])) ** 2 +
        (weight["짖는 정도"] * (row["짖는 정도"] - df_user["barking_tolerance"])) ** 2 +
        (weight["털 관리 정도"] * (row["털 관리 정도"] - df_user["grooming_effort"])) ** 2 +
        (weight["크기"] * (row["크기"] - df_user["preferred_size"])) ** 2 +
        (weight["공동생활"] * (row["공동생활"] - df_user["cohabitation_with_other_dogs"])) ** 2+
        (weight["운동 요구량"] * (row["운동 요구량"] - df_user["exercise_time"])) ** 2+
        (weight["훈련 용이성"] * (row["훈련 용이성"] - df_user["training_experience"])) ** 2+
        (weight["아이와의 친화력"] * (row["아이와의 친화력"] - df_user["child_friendliness"])) ** 2
    )
    return distance

# 각 강아지와 A가 매긴 점수와의 유클리드 거리(가중치 적용)를 계산하여 새로운 열로 추가
df["euclideanDistance"] = df.apply(calculate_weighted_euclidean_distance, axis=1, df_user = df_user, weight=weight)

# 유클리드 거리를 기준으로 오름차순으로 정렬하여 순위를 매김 (거리가 작을수록 유사도가 높음)
df = df.sort_values(by="euclideanDistance", ascending=True).reset_index(drop=True)

# 순위를 매김
df["순위"] = df.index + 1


# MongoDB에 저장할 user별 데이터 준비
user_data = {
    "user_id": int(df_user.iloc[0]["user_id"]),
    "rank_list": df[["desertionNo", "euclideanDistance"]].to_dict('records')
}

# MongoDB에 삽입
collection = db['user_character_rank']
collection.replace_one({'user_id': int(df_user.iloc[0]["user_id"])}, user_data, upsert=True)