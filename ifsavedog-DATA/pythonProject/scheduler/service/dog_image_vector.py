from transformers import AutoImageProcessor, AutoModelForImageClassification
import PIL

from service.get_datas import *
from service.set_datas import *

image_processor = AutoImageProcessor.from_pretrained("wesleyacheng/dog-breeds-multiclass-image-classification-with-vit")
model = AutoModelForImageClassification.from_pretrained("wesleyacheng/dog-breeds-multiclass-image-classification-with-vit")

def infer_dog_image_vector(dog_list):
    result_dict = dict()
    for dog in dog_list:
        image = PIL.Image.open(dog.dir).convert("RGB")
        inputs = image_processor(images=image, return_tensors="pt")

        outputs = model(**inputs)
        logits = outputs.logits

        result_dict[dog.id] = {
            "desertion_no": dog.desertion_no,
            "image_vector": logits.detach().numpy()[0].tolist()
        }
    
    return result_dict

def infer_dog_image_vector_by_date(date):
    dog_list = get_dogs_by_date(date)
    result = infer_dog_image_vector(dog_list)
    
    insert_list = [{"id": v, **result[v]} for v in result]
    insert_dog_image_vector(insert_list)

def infer_dog_image_vector_boot(strform):
    dog_list = get_dogs_boot(strform)
    print(len(dog_list))
    result = infer_dog_image_vector(dog_list)
    
    insert_list = [{"id": v, **result[v]} for v in result]
    print(len(insert_list))
    insert_dog_image_vector(insert_list)