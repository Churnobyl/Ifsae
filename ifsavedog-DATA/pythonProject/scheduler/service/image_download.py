import requests

from service.get_datas import *

def download_image_dog_list(dog_list):
    for target in dog_list:
        imageRes = requests.get(target.image, stream=True)
        if imageRes.status_code == 200:
            with open(f"{target.dir}", 'wb') as f:
                f.write(imageRes.content)
    
    return

def get_dog_list_by_date(date):
    return get_dogs_by_date(date)