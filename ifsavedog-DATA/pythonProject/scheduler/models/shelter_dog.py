from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Shelter_Dog(Base):
    __tablename__ = "shelter_dog"

    id = Column(Integer, primary_key=True)
    dog_id = Column(Integer, unique=True)
    shelter_id = Column(Integer)
    # dog_id = Column(Integer, ForeignKey("dog.id"))
    # shelter_id = Column(Integer, ForeignKey("shelter.id"))
        
    # dog = relationship("Dog", back_populates="shelter_dog")
    # shelter = relationship("Shelter", back_populates="shelter_dog")