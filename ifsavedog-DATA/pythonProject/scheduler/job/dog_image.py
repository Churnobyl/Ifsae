import re
import os

from service.image_download import *

def download_dog_image_by_date(date):
    dog_list = get_dog_list_by_date(date)
    
    download_image_dog_list(dog_list)