import numpy as np

def set_user_prefer_image_vector(user_id):
    # mongo db 접근. 선호 개 vector들 다 가져오기
    # 1. maria에서 rating 가져오기
    # 2. 그걸 기준으로 mongodb에서 개 이미지 벡터 가져오기
    # 3. 두개를 매핑해서 반환하는 함수
    dog_rates = list(dict())

    # 합해서 mongodb에 다시 저장
    dog_rate_array = np.array([np.array(rate['vector']) for rate in dog_rates])
    dog_rate_array.sum(axis=1)

    pass

def calc_cos_similarity(user_id):
    # mongo db 접근.
    # 코사인 유사도 계산
    # 
    pass