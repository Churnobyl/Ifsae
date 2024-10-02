from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str ## mariadB
    SECRET_KEY: str ## mariaDB
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    MONGO_URL: str ## mongoDB
    MONGO_DBNAME: str ## mongoDB

    class Config:
        env_file = ".env"

settings = Settings()
