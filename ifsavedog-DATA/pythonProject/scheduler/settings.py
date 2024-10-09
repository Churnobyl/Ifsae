import os
from dotenv import load_dotenv

load_dotenv()

class Setting:
    DATABASE_URL: str ## mariadB
    SECRET_KEY: str ## mariaDB
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    MONGO_URL: str ## mongoDB
    MONGO_DBNAME: str ## mongoDB
    SERVICE_KEY: str ## API KEY
    API_URL : str ## API URL
    S3_BUCKET_NAME: str ## S3
    S3_ACCESS_KEY: str ## S3
    S3_SECRET_KEY: str ## S3
    S3_REGION: str ## S3

config = Setting()
config.DATABASE_URL = os.getenv('DATABASE_URL')
config.SECRET_KEY = os.getenv('SECRET_KEY')
config.ALGORITHM = "HS256" 
config.ACCESS_TOKEN_EXPIRE_MINUTES = 30
config.MONGO_URL = os.getenv('MONGO_URL')
config.MONGO_DBNAME = os.getenv('MONGO_DBNAME')
config.SERVICE_KEY = os.getenv('SERVICE_KEY')
config.API_URL = os.getenv('API_URL')
config.S3_BUCKET_NAME = os.getenv('S3_BUCKET_NAME')
config.S3_ACCESS_KEY = os.getenv('S3_ACCESS_KEY')
config.S3_SECRET_KEY = os.getenv('S3_SECRET_KEY')
config.S3_REGION = os.getenv('S3_REGION')