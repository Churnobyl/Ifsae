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

config = Setting()
config.DATABASE_URL = os.getenv('DATABASE_URL')
config.SECRET_KEY = os.getenv('SECRET_KEY')
config.ALGORITHM = "HS256" 
config.ACCESS_TOKEN_EXPIRE_MINUTES = 30
config.MONGO_URL = os.getenv('MONGO_URL')
config.MONGO_DBNAME = os.getenv('MONGO_DBNAME')
config.SERVICE_KEY = os.getenv('SERVICE_KEY')
config.API_URL = os.getenv('API_URL')