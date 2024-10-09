from service.make_movie_opencv import *
from service.get_datas import *
import urllib.request
import random

movie_makers = [bbobbibbobbi, jjanggoo, gausian]

def rand_make_movie(image, id):  
  selected_function = random.choice(movie_makers)
  selected_function(image, id)


def make_movie() : 
  dogs = get_all_dogs()
  for dog in dogs:
    id = dog.id
    image_url = dog.image      
    resp = urllib.request.urlopen(image_url)
    image_data = resp.read()
    image_array = np.asarray(bytearray(image_data), dtype=np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    
    print(id, image)
    rand_make_movie(image, id)
    if id == 120: break
    
# for row 