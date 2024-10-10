from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from app.db.maria import get_db
from app.services.user_service import get_user_by_id
from app.services.dog_service import get_dog_by_desertion_no
from app.models.dog import DogResponse

router = APIRouter()

# dog 조회 API 
@router.get("/dogs/desertionNo/{desertion_no}", response_model=DogResponse)
async def retrieve_dog_by_desertion_no(desertion_no: str):    
    return await get_dog_by_desertion_no(desertion_no) 

# Spring에서 쏘는 POST 요청을 받을 API
@router.post("/ranking")
async def receive_ranking_data(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    if isinstance(data, dict):
        user_id = data.get("userId")
    else:
        user_id = data
    # 받은 userId를 출력하거나 원하는 로직 처리
    return {"status": "success"}