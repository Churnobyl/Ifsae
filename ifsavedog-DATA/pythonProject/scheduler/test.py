from db.maria import get_db
from service.get_datas import get_all_users
from job.recommend_by_character import calculate_dog_character_score

calculate_dog_character_score()

# print(get_all_users())