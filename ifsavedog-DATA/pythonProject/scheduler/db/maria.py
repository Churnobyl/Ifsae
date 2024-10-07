from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from settings import config
from contextlib import contextmanager

engine = create_engine(config.DATABASE_URL, pool_recycle=3600)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@contextmanager
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
