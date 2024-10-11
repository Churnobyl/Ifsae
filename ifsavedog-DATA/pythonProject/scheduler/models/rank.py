from sqlalchemy import Column, Integer, String, DateTime
# from sqlalchemy.ext.declarative import declarative_base
from models.base import Base

# Base = declarative_base()

class Rank(Base):
    __tablename__ = "ranking"

    id = Column(Integer, primary_key=True, index=True)
    ranking = Column(Integer, index=True)
    dog_id = Column(Integer, index=True)
    user_id = Column(Integer, index=True)
