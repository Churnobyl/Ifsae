import datetime
from pymongo import MongoClient

import requests
import pandas as pd
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

def input_data_to_mongo() : 
    # env 파일 로드
    load_dotenv()
    mongo_url = os.getenv('MONGO_URL')
    db_name = os.getenv('MONGO_DBNAME')    
    serviceKey = os.getenv('SERVICE_KEY')

    # MongoDB 클라이언트 생성

    client = MongoClient(mongo_url)
    # 데이터베이스와 컬렉션 선택
    db = client[db_name]
    collection = db['test']

    # API 호출
    url = 'http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic'
    response = requests.get(url)

    today = datetime.datetime.now()

    three_years_ago = today - datetime.timedelta(days=365*3)

    ## 3년 이후 데이터 삭제
    collection.delete_many({'happenDt': {'$lt': three_years_ago.strftime('%Y%m%d')}})


    qp = {
        "bgnde": today.strftime('%Y%m%d'),
        "endde": today.strftime('%Y%m%d'),
        # "bgnde" : "20241002",
        # "endde" : "20241002",
        "pageNo": 1,
        "state" : "protect",
        "numOfRows": "1000",    
        "serviceKey": serviceKey,
        "_type": "json"
    }
        
    def transfer_param(params):
        ret = ""
        for param in params:
            ret += param + '=' + str(params[param])
            ret += '&'
        return ret
    numOfRows = 1000
    _type = 'json'

    try:    
        res = requests.get(url, params=transfer_param(qp)).json()
        df = pd.DataFrame(res['response']['body']['items']['item'])

        ## API 요청 끝 ##

        # 중복 데이터 제거
        df = df.drop_duplicates(subset='desertionNo', keep='last')

        # nan 값을 none으로 변경(데이터베이스에 넣기 위해)
        df = df.where(pd.notnull(df), None)

        # 데이터 전처리
        df['species'] = df['kindCd'].str.extract(r'\[(.*?)\]')
        df['breed'] = df['kindCd'].str.extract(r'\](.*)')
        df['birth'] = df['age'].str.extract(r'(\d{4})').astype(int)
        df['under60days'] = df['age'].str.extract(r'(\d+일미만)')
        df['koreanAge'] = datetime.datetime.now().year-df['birth'].astype(int)+1
        df['weightFloat'] = df['weight'].str.extract(r'(\d+\.?\d*)').astype(float)

        print(client.server_info())
        
        # 데이터 삽입
        for _, row in df.iterrows():
            if not collection.find_one({'desertionNo': row['desertionNo']}):
                collection.insert_one(row.to_dict())

    except Exception as e:
        print(f"An error occurred: {e}")