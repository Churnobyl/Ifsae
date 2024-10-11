from service.get_datas import *
# from job.makes_movie import *
# from job.recommend_by_character import *
# from job.input_all_datas import *

# image_name = 'KakaoTalk_20241007_134037647.jpg'
# make_movie(image_name)
# user_list = {19,1,29}
# calculate_dog_character_score(user_list)
# print(get_all_users())
# download_dog_image_boot('2024070')
# print(len(get_all_image_vector()))
result_list = [{"dog_id": i.id, "desertion_no": i.desertion_no} for i in get_random_n_dogs(10)]
print(result_list)
# for i in get_random_n_dogs(10):
#     print(i.id, i.desertion_no)
