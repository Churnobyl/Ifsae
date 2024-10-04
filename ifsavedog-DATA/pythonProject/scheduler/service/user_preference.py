import numpy as np
from numpy.linalg import norm

from service.get_datas import get_user_rating, get_dog_image_vectors_list

def cos_sim(A, B):
  return np.dot(A, B)/(norm(A)*norm(B))

def user_prefer_image_vectors(user_id):
    ratings = get_user_rating(user_id=user_id)
    dog_list = [item for item in ratings]
    prefer_vector_list = get_dog_image_vectors_list(dog_list)
    return np.array(prefer_vector_list).sum(axis=1)

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

def calc_cos_similarity(user_id, dog_vector_dict):
    # mongo db 접근.
    # 코사인 유사도 계산
    # 
    similarlityDict = dict()
    for k in dog_vector_dict:
        similarlityDict[k] = cos_sim(np.array(user_prefer_vect), np.array(dog_image_dict[k]))
    
    ranking = sorted([(k, similarlityDict[k]) for k in similarlityDict], key=lambda x : x[1], reverse=True)
