from sqlalchemy import Column, Integer, String, DateTime
# from sqlalchemy.ext.declarative import declarative_base
from models.base import Base

# Base = declarative_base()

class Rating(Base):
    __tablename__ = "user_dog_rating"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, index=True)
    rating = Column(String, index=True)
    dog_id = Column(Integer, index=True)
    user_id = Column(Integer, index=True)
