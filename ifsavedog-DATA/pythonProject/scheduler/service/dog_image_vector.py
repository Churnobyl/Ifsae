from transformers import AutoImageProcessor, AutoModelForImageClassification
import PIL

image_processor = AutoImageProcessor.from_pretrained("wesleyacheng/dog-breeds-multiclass-image-classification-with-vit")
model = AutoModelForImageClassification.from_pretrained("wesleyacheng/dog-breeds-multiclass-image-classification-with-vit")

def infer_dog_image_vector(image_dir_list):
    result_dict = dict()
    for dir in image_dir_list:
        image = PIL.Image.open(f'./data/images/DOG/{dir}').convert("RGB")
        inputs = image_processor(images=image, return_tensors="pt")

        outputs = model(**inputs)
        logits = outputs.logits

        result_dict[dir.split('.')[0].split('_')[1]] = logits.detach().numpy()[0]
    
    return result_dict


def infer_dog_image_vector_by_date(date):
    pass