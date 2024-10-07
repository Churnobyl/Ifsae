from service.recommendation import *
from service.latest_dog import *
from service.liked_dog import *
from job.image_vector_filter import *

from db.mongo import *

# print(type(rank_latest_dog()))
rank_latest_dog()
# rank_liked_dog()
# insert_recommendation_rank(29)
# rank_image_vector_by_user(29)