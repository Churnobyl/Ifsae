import pandas as pd

from service.get_datas import *

def rank_liked_dog():
    rating_list = get_all_rating()
    rating_df = pd.DataFrame([{"user_id": rate.user_id, "dog_id": rate.dog_id, "rating": rate.rating, "create_at": rate.created_at} for rate in rating_list])
    count_result = list(rating_df['dog_id'].value_counts().keys())
    print(count_result)
    
    # print(rating_list)