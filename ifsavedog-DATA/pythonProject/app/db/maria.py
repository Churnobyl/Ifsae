from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# 데이터베이스 연결 설정
engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 요청마다 세션을 생성하고 닫는 함수
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
