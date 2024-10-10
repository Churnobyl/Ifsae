## 유저의 평가 데이터를 기반으로 전체 유기견의 순위를 매기고 mongoDB에 결과를 저장하는 코드 ##
from pymongo import MongoClient
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import numpy as np

import requests
import pandas as pd

# env 파일 로드
load_dotenv()
maria_url = os.getenv('DATABASE_URL')
mongo_url = os.getenv('MONGO_URL')
db_name = os.getenv('MONGO_DBNAME')    
serviceKey = os.getenv('SERVICE_KEY')

# mariaDB 연결
engine = create_engine(maria_url)

Base = declarative_base()

class User_survey(Base):
    __tablename__ = "user_survey"

    id = Column(Integer, primary_key=True, index=True)
    barking_tolerance = Column(Integer)
    child_friendliness = Column(Integer)
    cohabitation_with_other_dogs = Column(Integer)
    exercise_level = Column(Integer)
    exercise_score = Column(Integer)
    grooming_effort = Column(Integer)
    preferred_size = Column(Integer)
    training_experience = Column(Integer)
    user_id = Column(Integer, ForeignKey("user.id"))
    
    user = relationship("User", back_populates="user_survey")

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    
    user_survey = relationship("User_survey", back_populates="user")


# MongoDB 클라이언트 생성
client = MongoClient(mongo_url)
## 유기견 별 점수 계산 시작 ##
# 불러올 유기견 데이터베이스와 컬렉션 선택
db = client[db_name]
collection = db['dog_character']

result = collection.find()
df = pd.DataFrame(list(result)) # 불러온 자료를 dataFrame으로 변환

## sample dataset만들기 시작 ##
# 5명의 유저 정의
users = ['user_1', 'user_2', 'user_3', 'user_4', 'user_5']

# 평가 항목 정의 (8개의 factor)
categories = ["운동 강도", "짖는 정도", "털 관리 정도", "크기", "공동생활", "운동 요구량", "훈련 용이성", "아이와의 친화력"]

# 유저별 8개의 평가 항목에 대해 1~5점 사이의 랜덤 점수 생성
data = []
for user in users:
    # 각 유저가 8개의 항목에 대해 랜덤 점수를 부여
    scores = {category: np.random.randint(1, 6) for category in categories}
    scores['user_id'] = user  # 유저 ID 추가
    data.append(scores)

# DataFrame으로 변환
print(data)
dataset = pd.DataFrame(data)

## sampleDataset 만들기 끝 ##

## 유저별 유클리드 거리를 통한 강아지 순위 리스팅 시작 ##
# 각 항목별 가중치 설정
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

collection = db['user_character_rank']

for user in users:
    user_score = dataset[dataset['user_id'] == user]
        
    # 유클리드 거리 계산 함수 (가중치를 반영하여 계산)
    def calculate_weighted_euclidean_distance(row, user_score, weight):
        # 각 항목에 대해 가중치를 적용한 거리 계산
        distance = np.sqrt(
            (weight["운동 강도"] * (row["운동 강도"] - user_score["운동 강도"])) ** 2 +
            (weight["짖는 정도"] * (row["짖는 정도"] - user_score["짖는 정도"])) ** 2 +
            (weight["털 관리 정도"] * (row["털 관리 정도"] - user_score["털 관리 정도"])) ** 2 +
            (weight["크기"] * (row["크기"] - user_score["크기"])) ** 2 +
            (weight["공동생활"] * (row["공동생활"] - user_score["공동생활"])) ** 2+
            (weight["운동 요구량"] * (row["운동 요구량"] - user_score["운동 요구량"])) ** 2+
            (weight["훈련 용이성"] * (row["훈련 용이성"] - user_score["훈련 용이성"])) ** 2+
            (weight["아이와의 친화력"] * (row["아이와의 친화력"] - user_score["아이와의 친화력"])) ** 2
        )
        return distance

    # 각 강아지와 A가 매긴 점수와의 유클리드 거리(가중치 적용)를 계산하여 새로운 열로 추가
    df["euclideanDistance"] = df.apply(calculate_weighted_euclidean_distance, axis=1, user_score = user_score, weight=weight)

    # 유클리드 거리를 기준으로 오름차순으로 정렬하여 순위를 매김 (거리가 작을수록 유사도가 높음)
    df = df.sort_values(by="euclideanDistance", ascending=True).reset_index(drop=True)

    # 순위를 매김
    df["순위"] = df.index + 1
    
    # MongoDB에 저장할 user별 데이터 준비
    user_data = {
        "user_id": user,
        "rank_list": df[["desertionNo", "euclideanDistance"]].to_dict('records')
    }
    
    # MongoDB에 삽입
    collection.insert_one(user_data)

## 유저별 유클리드 거리를 통한 강아지 순위 리스팅 끝 ##


