import datetime

from service.get_datas import get_all_users

from job.dog_image import *
from job.depersonalization import *
from job.image_vector_filter import rank_image_vector
from job.input_all_dogs import input_all_dogs
from job.input_character_score import calculate_dog_character_score
from service.recommendation import recommedate

today = datetime.date.today()
def before_date(d):
    return datetime.timedelta(days=d)

def sequential_job_for_new_data():
    today = datetime.date.today().strftime('%Y%m%d')
    
    # 1. 강아지 api 쏘고 mariaDB에 삽입
    # 2. 추가된 정보 참고해서 image download
    # 3. 다운로드 된 강아지 image 모델 이용해서 vector 뽑기   
    # ==================================================================
    # 4. 유저 별 + 기준 별 개인화 추천 랭크 최신화 -> 
    #     - image_vector_rank
    #     - character_rank
    # 5. 이걸 종합하는 최종 랭킹을 mariaDB에 삽입 -> daily
    download_dog_image_by_date(today)
    rank_latest_dog()

def sequential_job_daily(date):
    yesterday = (today - before_date(1)).strftime('%Y%m%d')
    start_date = (today - before_date(date)).strftime('%Y%m%d') # 오늘 기준 date일 전 선택
    end_date = (today - before_date(1)).strftime('%Y%m%d') # 오늘 기준 1일 전 날짜 선택
    input_all_dogs(start_date, end_date)

    # 1. 강아지 api 쏘고 mariaDB에 삽입
    # 2. 추가된 정보 참고해서 image download
    # 3. 다운로드 된 강아지 image 모델 이용해서 vector 뽑기
    new_dog_vector_list = infer_dog_image_vector_by_date(yesterday)
    calculate_dog_character_score(new_dog_vector_list)

    users_id = [u.id for u in get_all_users()]
    # 4. 몽고 DB에 추천 랭크 넣기
    # 비개인화 추천 알고리즘
    # - 최신순
    print('rank_latest start')
    rank_latest_dog()
    # - 인기순
    print('rank_liked start')
    rank_liked_dog()

    # 유저 별 개인화 추천 알고리즘
    # image vecctor즘rank
    rank_image_vector(user_list=users_id)
    calculate_dog_character_score(users_id)

    # 5. 최종 랭킹 mariaDB에 삽입
    recommedate(users_id)