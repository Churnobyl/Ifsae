import requests

def download_image_dog_list(dog_list):
    
    for target in images:
        imageRes = requests.get(target['popfile'], stream=True)
        if imageRes.status_code == 200:
            with open(f"{image_dir}", 'wb') as f:
                f.write(imageRes.content)
    
    return