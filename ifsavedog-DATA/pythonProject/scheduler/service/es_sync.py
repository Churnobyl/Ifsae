import mysql.connector
from elasticsearch import Elasticsearch, helpers
import datetime

# 데이터베이스 연결 설정
db_config = {
    'host': 'stg-yswa-kr-practice-db-master.mariadb.database.azure.com',
    'user': 'S11P21A508@stg-yswa-kr-practice-db-master',
    'password': 'BWa8Gj54iY',
    'database': 'S11P21A508'
}

# Elasticsearch 연결 설정
es = Elasticsearch(['https://j11a508.p.ssafy.io:9200'],
                   basic_auth=("elastic", "elastic"),
                   verify_certs=False)

# 마지막 실행 시간 저장을 위한 파일 경로
last_run_file = 'last_run.txt'

# 인덱스 이름 및 매핑 정의
INDEX_NAME = 'dog'

mapping = {
    "settings": {
        "number_of_shards": 1,
        "number_of_replicas": 0,
        "refresh_interval": "30s",
        "max_ngram_diff": 19,
        "codec": "best_compression",
        "routing": {
            "allocation": {
                "include": { "_tier_preference": "data_content" }
            }
        },
        "analysis": {
            "filter": {
                "my_nori_filter": {
                    "type": "nori_part_of_speech",
                    "stoptags": [
                        "NR", "J", "E", "MAJ", "MM", "SP", "NA", "XSA",
                        "NNB", "NNBC", "SC", "SE", "SF", "SH", "SN",
                        "SSC", "SSO", "SY", "UNA", "VCN", "VCP", "VSV"
                    ]
                },
                "my_ngram_filter": {
                    "type": "ngram",
                    "min_gram": 1,
                    "max_gram": 20
                }
            },
            "tokenizer": {
                "my_nori_tokenizer": {
                    "type": "nori_tokenizer",
                    "decompound_mode": "mixed"
                }
            },
            "analyzer": {
                "my_custom_analyzer": {
                    "type": "custom",
                    "tokenizer": "my_nori_tokenizer",
                    "filter": ["my_nori_filter", "my_ngram_filter"]
                }
            }
        }
    },
    "mappings": {
        "properties": {
            "id": {"type": "keyword"},
            "name": {
                "type": "text",
                "analyzer": "my_custom_analyzer"
            },
            "species": {
                "type": "text",
                "analyzer": "my_custom_analyzer"
            },
            "shelter": {
                "type": "nested",
                "properties": {
                    "shelterId": {"type": "keyword"},
                    "name": {
                        "type": "text",
                        "analyzer": "my_custom_analyzer"                       
                    }
                }
            }
        }
    }
}


def create_index_if_not_exists(es_client, index_name, mapping):
    if not es_client.indices.exists(index=index_name):
        es_client.indices.create(index=index_name, body=mapping)
        print(f"인덱스 '{index_name}'가 생성되었습니다.")
    else:
        print(f"인덱스 '{index_name}'가 이미 존재합니다.")

# def get_last_run_time():
#     try:
#         with open(last_run_file, 'r') as f:
#             return f.read()
#     except FileNotFoundError:
#         return None

# def save_last_run_time(run_time):
#     with open(last_run_file, 'w') as f:
#         f.write(run_time)

def create_index_if_not_exists(es_client, index_name, mapping):
    if es_client.indices.exists(index=index_name):
        # 기존 인덱스 삭제
        es_client.indices.delete(index=index_name)
        print(f"인덱스 '{index_name}'가 삭제되었습니다.")
    es_client.indices.create(index=index_name, body=mapping)
    print(f"인덱스 '{index_name}'가 생성되었습니다.")

def fetch_data():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor(dictionary=True)

    # 모든 dog의 id 목록 가져오기
    dog_query = "SELECT id FROM dog"
    cursor.execute(dog_query)

    dog_ids = [row['id'] for row in cursor.fetchall()]

    # dog_ids가 없으면 빈 리스트 반환
    if not dog_ids:
        cursor.close()
        conn.close()
        return []

    # 각 dog에 대한 상세 정보와 관련된 shelters 가져오기
    format_strings = ','.join(['%s'] * len(dog_ids))

    # dog 정보 가져오기
    dog_query = f"""
    SELECT id, name, species
    FROM dog
    WHERE id IN ({format_strings})
    """
    cursor.execute(dog_query, tuple(dog_ids))
    dogs = cursor.fetchall()

    # shelter_dog 및 shelter 정보 가져오기
    shelter_query = f"""
    SELECT sd.dog_id, s.id AS shelter_id, s.name AS shelter_name
    FROM shelter_dog sd
    JOIN shelter s ON sd.shelter_id = s.id
    WHERE sd.dog_id IN ({format_strings})
    """
    cursor.execute(shelter_query, tuple(dog_ids))
    shelter_rows = cursor.fetchall()

    cursor.close()
    conn.close()

    # dog_id를 키로 하는 shelter 매핑 생성
    shelter_by_dog = {}
    for row in shelter_rows:
        dog_id = row['dog_id']
        shelter_info = {
            "shelterId": row['shelter_id'],
            "name": row['shelter_name']
        }
        shelter_by_dog[dog_id] = shelter_info  # 하나의 shelter만 사용

    # 각 dog에 shelter를 매핑하여 최종 데이터 생성
    for dog in dogs:
        dog_id = dog['id']
        dog['shelter'] = shelter_by_dog.get(dog_id, {"shelterId": "", "name": ""})

    return dogs

def index_data(rows):
    actions = []
    for row in rows:
        document = {            
            "id": str(row['id']),
            "name": row['name'],
            "species": row['species'],
            "shelter": {
                "shelterId": str(row['shelter']['shelterId']),
                "name": row['shelter']['name']
            }
        }

        action = {
            "_index": INDEX_NAME,
            "_id": str(row['id']),
            "_source": document
        }
        actions.append(action)

    if actions:
        helpers.bulk(es, actions)
        print(f"{len(actions)}개의 문서가 인덱싱되었습니다.")

def main():
    # 인덱스 생성 또는 존재 여부 확인
    create_index_if_not_exists(es, INDEX_NAME, mapping)

    # 모든 데이터를 가져옵니다.
    rows = fetch_data()
    if rows:
        index_data(rows)
    else:
        print("데이터가 없습니다.")

if __name__ == "__main__":
    main()