import datetime
from pymongo import MongoClient

import requests
import pandas as pd

# MongoDB 클라이언트 생성
client = MongoClient('mongodb+srv://S11P21A508:10PbELNEKa@ssafy.ngivl.mongodb.net/S11P21A508?authSource=admin')

# 데이터베이스와 컬렉션 선택
db = client['S11P21A508']
collection = db['test']

# API 호출
url = 'http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic'
response = requests.get(url)
tmp_qp = 'bgnde=20240801&endde=20240830&pageNo=82&numOfRows=100&serviceKey=GGmzij7bJ%2BoRdhZ%2FKesNAzCHh2rdF2wwQO9t4S1rLd%2BQBpbZ%2FariKynFa29NyqxqLNRWCiWMH4fjOP%2BZ47jMIg%3D%3D&_type=json'

start_date = datetime.datetime(2021,9,24)

today = datetime.datetime.now()

three_years_ago = today - datetime.timedelta(days=365*3)

collection.delete_many({'happenDt': {'$lt': three_years_ago.strftime('%Y%m%d')}})

qp = {
    "bgnde": today.strftime('%Y%m%d'),
    "endde": today.strftime('%Y%m%d'),
    "pageNo": 1,
    "state" : "protect",
    "numOfRows": "1000",    
    "serviceKey": 'GGmzij7bJ%2BoRdhZ%2FKesNAzCHh2rdF2wwQO9t4S1rLd%2BQBpbZ%2FariKynFa29NyqxqLNRWCiWMH4fjOP%2BZ47jMIg%3D%3D',
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

start_date = end_date + datetime.timedelta(days=1)

# app = FastAPI()




# class Item(BaseModel):
#     desertionNo : str
#     age: str
#     weight : str

# class Items():
#     desertionNo : str
#     age: str
#     weight : str


# @app.get("/")
# def read_root():
#     return {"Hello": "World"}


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}

# @app.get("/items/test/{item_id}")
# def create_item(item_id: int):  
#     dog = df[item_id]
#     print(dog['desertionNo'])
#     item = Items()
#     item.desertionNo = dog['desertionNo']
#     item.age = dog['age']
#     item.weight = dog['weight']
#     return {"item_id" : item_id, "item" : item}

# @app.post("/items")
# def create_item(item: Item):
#     return item