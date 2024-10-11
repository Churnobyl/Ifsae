import datetime
from service.get_datas import *
from service.insert_rank_values import *

    
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

def get_latest_n_dogs(n):
    latest_dog = get_dogs_ordered_by_date(n)
    return latest_dog