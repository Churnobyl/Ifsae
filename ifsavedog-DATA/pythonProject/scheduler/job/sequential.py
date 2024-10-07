import datetime

from job.dog_image import *
from service.latest_dog import rank_latest_dog
from job.image_vector_filter import rank_image_vector

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

def sequential_job_daily():
    today = datetime.date.today().strftime('%Y%m%d')
    rank_image_vector()