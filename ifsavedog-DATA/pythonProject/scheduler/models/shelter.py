from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
# from sqlalchemy.ext.declarative import declarative_base
from models.base import Base

# Base = declarative_base()

class Shelter(Base):
    __tablename__ = "shelter"

    id = Column(Integer, primary_key=True)
    can_be_donated = Column(Integer, default=1)
    phone = Column(String)
    address = Column(String)
    content = Column(String)
    name = Column(String)  
    
    shelter_user = relationship("Shelter_User", back_populates="shelter")
    
    # shelter_dog = relationship("Shelter_Dog", back_populates="shelter")
    
    # post = relationship("Post", back_populates="shelter", lazy='joined')       

class Shelter_User(Base):
    __tablename__ = "shelter_user"

    id = Column(Integer, primary_key=True)
    shelter_id = Column(Integer, ForeignKey("shelter.id"))
    user_id = Column(Integer, ForeignKey("user.id"))

    shelter = relationship("Shelter", back_populates="shelter_user")
    user = relationship("User", back_populates="shelter_users")