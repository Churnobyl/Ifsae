from sqlalchemy import create_engine, func
from sqlalchemy.orm import sessionmaker
import random
from contextlib import contextmanager

from settings import config


engine = create_engine(config.DATABASE_URL, pool_recycle=3600)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@contextmanager
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def query_random_offset(db, model):
    return int(
        random.random() *
        db.query(func.count(model.id)).scalar()
    )
