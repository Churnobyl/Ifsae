from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Post(Base):
    __tablename__ = "post"

    id = Column(Integer, primary_key=True)
    like_cnt = Column(Integer, default=0)
    view_cnt = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(DateTime(timezone=True), default=func.now())    
    content = Column(String)
    title = Column(String)
    video_url = Column(String)
    thumnail_url = Column(String)
    
    
    shelter_id = Column(Integer, ForeignKey("shelter.id"))
    shelter = relationship("Shelter", back_populates="post")    