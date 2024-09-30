from fastapi import HTTPException
from app.models.dog import Dog, DogResponse


# desertionNo로 개를 조회하는 함수
async def get_dog_by_desertion_no(desertion_no: str) -> DogResponse:
    dog = await Dog.find_one(Dog.desertionNo == desertion_no)    
    if dog:
        return DogResponse(**dog.model_dump())  # 문서를 Pydantic 모델로 변환하여 반환
    raise HTTPException(status_code=404, detail="Dog not found")
