from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Dog(Base):
    __tablename__ = "dog"

    id = Column(Integer, primary_key=True)
    age = Column(Integer)
    dog_status = Column(Integer)
    gender = Column(Integer)
    species_id = Column(Integer, ForeignKey("species.id"))
    desertion_no = Column(String, unique=True)
    image = Column(String)
    dir = Column(String)
    info = Column(String)
    name = Column(String)
    species_name = Column(String)
    
    species = relationship("Species", back_populates="dog")

class Species(Base):
    __tablename__ = "species"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    dog = relationship("Dog", back_populates="species")  
        
        