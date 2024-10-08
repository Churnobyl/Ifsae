import pandas as pd

from service.get_datas import *
from service.insert_rank_values import insert_liked_rank

def rank_liked_dog():
    rating_list = get_all_rating()
    # for d,a in rating_list:
    #     print(d, a)
    rating_df = pd.DataFrame([{"user_id": rate.user_id, "dog_id": rate.dog_id, "desertion_no": dog.desertion_no, "rating": rate.rating, "create_at": rate.created_at} for rate, dog in rating_list])
    # print(rating_df)
    rating_count_df = rating_df['dog_id'].value_counts().reset_index()
    # print(rating_count_df)
    rating_merged_df = pd.merge(rating_count_df, rating_df[['dog_id', 'desertion_no']], how='left').drop_duplicates(subset=['dog_id'])
    # print(rating_merged_df)
    count_result = rating_merged_df.to_records().tolist()
    print(count_result)

    insert_liked_rank(count_result)

def get_rating_day_ago(day):
    pass