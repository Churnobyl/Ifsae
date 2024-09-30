# models/dog.py
from pydantic import BaseModel, Field
from beanie import Document
from typing import Optional
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError('Invalid ObjectId')
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, schema, handler):
        schema.update(type='string')
        return schema



class Dog(Document):
    kindCd: str
    weightFloat: float
    koreanAge: int
    desertionNo: str

    class Settings:
        collection = "test"  # MongoDB의 컬렉션 이름 설정

# Pydantic을 사용한 스키마 정의
# Create하는 코드
# class DogCreate(BaseModel):
#     name: str
#     breed: str
#     age: Optional[int]
#     description: Optional[str]

class DogResponse(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    kindCd: str
    weightFloat: float
    koreanAge: int
    desertionNo: str
    
    class Config:
        json_encoders = {ObjectId: str}
        from_attributes = True
