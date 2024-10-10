from service.get_datas import *
from service.insert_video_to_s3 import *
from service.set_datas import *
from models.post import Post

# post에 데이터를 넣고, s3에 업로드, post_dog 테이블에 매칭작업 하는 함수
def input_post_datas_and_match_post_dog(dog):
  dog_id = dog.id  
  # post_id를 만들어 내기 위해 더미데이터를 insert 한다.
  post_id = insert_post_dummy_data()  
  
  # 이미지는 기존에 dog 테이블에 에 넣어둔 image 컬럼을 참조한다.(api의 url과 동일)
  image = make_image(dog)    
  # 이미지를 기반으로 영상을 만든다. (임시로 생성되는 영상의 파일 이름은 dog_id.mp4로 한다.)
  file_name = rand_make_movie(image, dog_id)
  upload_file_to_s3(file_name, str(post_id)) # local의 file_name을 post_id 이름으로 s3에 업로드
  print(post_id)
  match_post_dog(dog_id, post_id)
  
  dog_name = dog.name
  dog_image = dog.dir
  
  shelter_id = get_shelter_id_by_dog_id(dog_id)
  
  post_info = Post(
    id = post_id,
    title = dog_name,
    content = dog_name+"의 귀여운 영상입니다.",
    shelter_id = shelter_id,
    video_url = f"video/{post_id}.mp4",
    thumbnail_url = dog_image    
  )
  
  update_post(post_info)
  
   
  # make_movie(dog, post_id)

# post에 더미데이터를 insert한다.
# insert하고 나면 최신의 postid가 생긴다.
# 영상을 만들고 업로드하는데 이때 영상 이름은 postid로 한다.
# 영상을 만들 때 사용한 dogid와 postid를 매칭시킨다.
# 영상제목(강아지 이름), content, url과 썸네일 이미지를 다시 db에 업데이트 시켜준다. 
