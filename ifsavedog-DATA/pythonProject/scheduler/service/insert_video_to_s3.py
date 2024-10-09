import boto3
from boto3.s3.transfer import TransferConfig
from settings import config
from models.post import *
from models.post_dog import *
from service.make_movie_opencv import *
from service.set_datas import *
from service.get_datas import *
import cv2
import urllib.request
import random


## 랜덤한 포멧으로 영상을 만들어주는 함수(parameter: image, dog_id, reutrn: file_name)
def rand_make_movie(image, id):  
    movie_makers = [bbobbibbobbi, jjanggoo, gausian]
    selected_function = random.choice(movie_makers)
    return selected_function(image, id)

# s3에 영상 업로드하는 함수(parameter: file_name, object_name(optional))
# Args:
#    file_name (str): 업로드할 파일의 로컬 경로
#    object_name (str, optional): S3에서 사용할 파일 이름 (기본값은 로컬 파일 이름과 동일)    
def upload_file_to_s3(file_name, object_name=None):
    # AWS 자격 증명 설정 (AWS CLI 설정을 사용하면 생략 가능)
    aws_access_key_id = config.S3_ACCESS_KEY
    aws_secret_access_key = config.S3_SECRET_KEY
    region_name = config.S3_REGION
    bucket_name = config.S3_BUCKET_NAME

    # S3 클라이언트 생성
    s3 = boto3.client(
        's3',
        aws_access_key_id=aws_access_key_id,
        aws_secret_access_key=aws_secret_access_key,
        region_name=region_name
    )    
    
    transfer_config = TransferConfig(multipart_threshold=1024 * 1 * 1024, max_concurrency=10,
                            multipart_chunksize=1024 * 1024 * 1, use_threads=True)
    if object_name is None:
        object_name = f"video/{file_name}.mp4"
    try:
        object_name = f"video/{object_name}.mp4"
        s3.upload_file(file_name, bucket_name, object_name, Config=transfer_config)
        print(f"{file_name} 파일이 {bucket_name}/{object_name}에 업로드되었습니다.")        
    except Exception as e:
        print(f"파일 업로드 중 오류 발생: {e}")

    
# db에 넣을 dummy data를 insert하는 함수 (return :dummy로 넣은 post_data의 post_id)
def insert_post_dummy_data() :
  post = Post(    
    title = "tmp",
    video_url = "dummy.mp4",
    shelter_id = 54,
    thumbnail_url = ""    
  )
  insert_post(post)  
  post_id = get_latest_post().id
  return post_id

# dog의 이미지를 받아와서 영상을 만들기 위한 image로 만드는 작업
def make_image(dog):  
  image_url = dog.image      
  resp = urllib.request.urlopen(image_url)
  image_data = resp.read()
  image_array = np.asarray(bytearray(image_data), dtype=np.uint8)
  image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
  return image

def match_post_dog(dog_id, post_id):
  post_dog = Post_Dog(
    post_id = post_id,
    dog_id = dog_id
  )
  insert_post_dog(post_dog)