from service.latest_dog import *
from service.liked_dog import *

def rank_latest_dog():
    latest_dog = get_latest_n_dogs(2000)
    
    insert_latest_rank(latest_dog)

