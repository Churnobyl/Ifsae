from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.maria import get_db
from app.services.user_service import get_user_by_id
from app.services.dog_service import get_dog_by_desertion_no
from app.models.dog import DogResponse

router = APIRouter()

@router.get("/users/{user_id}")
async def read_user(user_id: int, db: Session = Depends(get_db)):
    user = get_user_by_id(db, user_id)
    if user is None:
        return {"error": "User not found"}
    print("test")
    return user

@router.get("/dogs/desertionNo/{desertion_no}", response_model=DogResponse)
async def retrieve_dog_by_desertion_no(desertion_no: str):    
    return await get_dog_by_desertion_no(desertion_no)