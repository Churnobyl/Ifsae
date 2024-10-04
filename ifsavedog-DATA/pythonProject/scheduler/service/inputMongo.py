import datetime
from pymongo import MongoClient
import random

import requests
import pandas as pd
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
from settings import config

from models.dog import Dog
from db.mongo import get_mongo_db
from db.maria import get_db, engine

## API 호출 함수
def get_data() :         
    url = config.API_URL
    response = requests.get(url)
    today = datetime.datetime.now()
    three_years_ago = today - datetime.timedelta(days=365*3)
        
    # 3년 이후 데이터 삭제    
    get_mongo_db().test.delete_many({'happenDt': {'$lt': three_years_ago.strftime('%Y%m%d')}})
    
    # API 요청    
    service_key = config.SERVICE_KEY
    qp = {
        # "bgnde": today.strftime('%Y%m%d'),
        # "endde": today.strftime('%Y%m%d'),            
        "bgnde": "20241002",
        "endde": "20241002",
        "pageNo": 1,
        "state" : "protect",
        "numOfRows": "1000",    
        "serviceKey": service_key,
        "_type": "json"
    }        
    
    # API 주소를 사용할 수 있도록 편집하는 함수
    def transfer_param(params):
        ret = ""
        for param in params:
            ret += param + '=' + str(params[param])
            ret += '&'
        return ret
    numOfRows = 1000
    _type = 'json'

    res = requests.get(url, params=transfer_param(qp)).json()
    df = pd.DataFrame(res['response']['body']['items']['item'])
    return df
## API 요청 끝 ##

## 데이터 전처리 함수 시작 ##
def preprocess_data(df) :
    # api에서 가져올 때 중복 데이터 제거
    df = df.drop_duplicates(subset='desertionNo', keep='last')
    # nan 값을 none으로 변경(데이터베이스에 넣기 위해)
    df = df.where(pd.notnull(df), None)
    
    # 'species'가 '개'인 데이터만 추출
    df['species'] = df['kindCd'].str.extract(r'\[(.*?)\]')
    df = df[df['species'] == '개']
    
    # 데이터 전처리        
    df_dog = pd.DataFrame()
    df_dog['age'] = datetime.datetime.now().year-df['age'].str.extract(r'(\d{4})').astype(int)+1
    df_dog['dog_status'] = 0
    # 'sexCd'가 'F'인 경우 'gender'를 1, 'M'인 경우 0으로 설정
    df_dog.loc[df['sexCd'] == 'F', 'gender'] = 1
    df_dog.loc[df['sexCd'] == 'M', 'gender'] = 0
    df_dog.loc[~df['sexCd'].isin(['F', 'M']), 'gender'] = None
    df_dog['species_name'] = df['kindCd'].str.extract(r'\](.*)')
    df_dog['desertion_no'] = df['desertionNo']
    df_dog['image'] = df['popfile']
    df_dog['dir'] = "image/dog/20251225_49.jpg"
    df_dog['info'] = df['specialMark']
    name = list({'해피', '초코', '송이', '코코', '마루', '밀키', '토리', '구름', '단추', 
            '루키', '모카', '제로', '담이', '레오', '토피', '보노', '카이', '미르', '샌디',
            '바람', '포키', '두리', '미로', '소이', '리오', '하쿠', '피넛', '미미', '미나',
            '미로', '미루', '제이', '누리', '미오', '알로', '디노', '밤비', '라떼', '위니',
            '도비', '제티', '베니', '타코', '오드', '피코', '누크', '체리', '호두', '비니',
            '초이', '라온', '또미', '꼬미', '미키', '코니', '하니', '루루', '토토', '티노',
            '키위', '무무', '버디', '가을', '도리', '뚱이', '뚜비', '뚜치', '뿌꾸', '아리',
            '여름', '보미', '희망', '쫑이', '초롱', '포비', '퐁키', '푸름', '하늘', '하랑',
            '하리', '한별', '호야', '노아', '노을', '노리', '다롱', '누비', '나리', '숭이',
            '라라', '로로', '미리', '예삐', '감자', '공주', '까미', '나나', '이슬', '자두',
            '햇님', '슈미', '샛별', '로미'})
    df_dog['name'] = [random.choice(name) for i in range(len(df))]
    return df_dog
## 데이터 전처리 함수 끝 ##

# ## 데이터 삽입 ##
# def insert_data_to_mongo(df) :
#     for _, row in df.iterrows():
#         if not get_mongo_db().test.find_one({'desertionNo': row['desertionNo']}):
#             get_mongo_db().test.insert_one(row.to_dict())
    
## 데이터 중복 확인 시작 ##
def is_exist_data(db, df) :
    for _, row in df.iterrows():
        dog = db.query(Dog).filter(Dog.desertion_no == row['desertion_no']).first()
        if dog:
            return True
    return False
## 데이터 중복 확인 끝 ##

## 데이터 삽입 시작 ##
def insert_data_to_sql(db, df) :     
    for _, row in df.iterrows():
        dog = Dog(
            age=row['age'],
            dog_status=row['dog_status'],
            gender=row['gender'],
            species_name=row['species_name'],
            desertion_no=row['desertion_no'],
            image=row['image'],
            dir=row['dir'],
            info=row['info'],
            name=row['name']
            )
        db.add(dog)
    db.commit()
## 데이터 삽입 끝 ##