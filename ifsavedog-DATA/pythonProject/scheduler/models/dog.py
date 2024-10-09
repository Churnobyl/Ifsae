from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
# from sqlalchemy.ext.declarative import declarative_base
from models.base import Base

# Base = declarative_base()

class Dog(Base):
    __tablename__ = "dog"

    id = Column(Integer, primary_key=True)
    age = Column(Integer)
    dog_status = Column(Integer, default=0)
    gender = Column(Integer)    
    desertion_no = Column(String, unique=True)
    happen_dt = Column(String)
    image = Column(String)
    dir = Column(String)
    info = Column(String)
    name = Column(String)
    species = Column(String)
    
    