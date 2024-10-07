import pandas as pd
import numpy as np
import constant_value as cv

def make_dataframe(survey_data, dog_data):  
  user_dataset = pd.DataFrame()
  user_dataset['user_id'] = [survey_data.user_id]
  user_dataset['운동 강도'] = [survey_data.exercise_level]
  user_dataset['짖는 정도'] = [survey_data.barking_tolerance]
  user_dataset['털 관리 정도'] = [survey_data.grooming_effort]
  user_dataset['크기'] = [survey_data.preferred_size]
  user_dataset['공동생활'] = [survey_data.cohabitation_with_other_dogs]
  user_dataset['운동 요구량'] = [survey_data.exercise_time]
  user_dataset['훈련 용이성'] = [survey_data.training_experience]
  user_dataset['아이와의 친화력'] = [survey_data.child_friendliness]
  
  dog_dataset = pd.DataFrame(list(dog_data))
  
  return user_dataset, dog_dataset

def calculate_weighted_euclidean_distance(row, user_score, weight):
  weight = cv.weight
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

def rank_dog_by_character(db, dog_dataset, user_dataset):
  collection = db['user_character_rank']
  weight = cv.weight
  # 각 강아지와 A가 매긴 점수와의 유클리드 거리(가중치 적용)를 계산하여 새로운 열로 추가
  dog_dataset["euclideanDistance"] = dog_dataset.apply(calculate_weighted_euclidean_distance, axis=1, user_score = user_dataset, weight=weight)
  # 유클리드 거리를 기준으로 오름차순으로 정렬하여 순위를 매김 (거리가 작을수록 유사도가 높음)
  dog_dataset = dog_dataset.sort_values(by="euclideanDistance", ascending=True).reset_index(drop=True)
  
  dog_dataset["dog_id"] = dog_dataset["id"]
  # MongoDB에 저장할 user별 데이터 준비
  user_id = user_dataset['user_id'].iloc[0]
  final_data = {
    "user_id": int(user_id),
    "rank_list": dog_dataset[["dog_id", "desertion_no", "euclideanDistance"]].to_dict('records')
  }
  return final_data

  # MongoDB에 삽입
def insert_user_character_rank_to_mongo(db, final_data):
  collection = db['user_character_rank']
  collection.insert_one(final_data)

## 유저별 유클리드 거리를 통한 강아지 순위 리스팅 끝 ##


