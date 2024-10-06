from job.dog_image import *
import datetime

def sequential_job_every_day():
    today = datetime.date.today().strftime('%Y%m%d')
    download_dog_image_by_date(today)

def sequential_job():
    today = datetime.date.today().strftime('%Y%m%d')