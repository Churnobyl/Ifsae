from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
# from sqlalchemy.ext.declarative import declarative_base
from models.base import Base

# Base = declarative_base()

class User(Base):
    __tablename__ = "user"
    
    grade = Column(Integer)
    role = Column(Integer)
    user_status = Column(Integer)
    id = Column(Integer, primary_key=True, index=True)    
    user_profile_id = Column(Integer)
    email = Column(String, unique=True, index=True)
    nickname = Column(String, index=True)
    password = Column(String)
    profile_img_url = Column(String)

    user_survey = relationship("UserSurvey", back_populates="user")
    shelter_users = relationship("Shelter_User", back_populates="user")

class UserSurvey(Base):
        __tablename__ = "user_survey"

        id = Column(Integer, primary_key=True, index=True)
        barking_tolerance = Column(Integer)
        child_friendliness = Column(Integer)
        cohabitation_with_other_dogs = Column(Integer)
        exercise_level = Column(Integer)
        exercise_time = Column(Integer)
        grooming_effort = Column(Integer)
        preferred_size = Column(Integer)
        training_experience = Column(Integer)
        user_id = Column(Integer, ForeignKey("user.id"))
        
        user = relationship("User", back_populates="user_survey")