import datetime
from service.get_datas import *
from service.insert_rank_values import *

def rank_latest_dog():
    latest_dog = get_latest_1000_dogs()
    
    insert_latest_rank(latest_dog)
    
def get_today_dog():
    today = datetime.date.today().strftime('%Y%m%d')
    
    dog_list = get_dogs_by_date(today)
    return dog_list

def get_days_ago_dog(days):
    dates = []
    for d in range(1, days):
        dates.append((datetime.date.today() - datetime.timedelta(days=d)).strftime('%Y%m%d'))
    
    dog_list = get_dogs_by_date_list(dates)
    return dog_list

def get_latest_1000_dogs():
    latest_dog = get_dogs_ordered_by_date(1000)
    return latest_dog