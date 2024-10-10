from pydantic_settings import BaseSettings

class Settings(BaseSettings):
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

    class Config:
        env_file = ".env"

settings = Settings()


CORS_CONFIG = {
    "allow_origins": ["*"],  # 모든 도메인을 허용합니다. 특정 도메인만 허용하려면 예: ["http://example.com"]
    "allow_credentials": True,
    "allow_methods": ["*"],  # 모든 HTTP 메서드를 허용합니다.
    "allow_headers": ["*"],  # 모든 헤더를 허용합니다.
}