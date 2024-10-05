from service.image_download import *
from service.dog_image_vector import *

def download_dog_image_by_date(date):
    dog_list = get_dog_list_by_date(date)
    
    download_image_dog_list(dog_list)

def download_dog_image_boot(strform):
    dog_list = get_dog_list_boot(strform)
    
    download_image_dog_list(dog_list)
    print('complete')
    
def dog_image_vector_by_date(date):
    infer_dog_image_vector_by_date(date)

def dog_image_vector_boot(strform):
    infer_dog_image_vector_boot(strform)
    print('complete')