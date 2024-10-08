from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Shelter(Base):
    __tablename__ = "shelter"

    id = Column(Integer, primary_key=True)
    can_be_donated = Column(Integer, default=1)
    phone = Column(String)
    address = Column(String)
    content = Column(String)
    name = Column(String)  
    
    # shelter_dog = relationship("Shelter_Dog", back_populates="shelter")
    
    # post = relationship("Post", back_populates="shelter", lazy='joined')       
        