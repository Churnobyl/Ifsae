from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.maria import get_db
from app.services.user_service import get_user_by_id
from app.services.dog_service import get_dog_by_desertion_no
from app.models.dog import DogResponse

from dotenv import load_dotenv
load_dotenv()

package_root = os.getenv("PYTHONPATH")
if package_root:
    sys.path.insert(0, package_root)

from scheduler.service.recommendation import insert_recommendation_rank

router = APIRouter()

# dog 조회 API 
@router.get("/dogs/desertionNo/{desertion_no}", response_model=DogResponse)
async def retrieve_dog_by_desertion_no(desertion_no: str):    
    return await get_dog_by_desertion_no(desertion_no)

@router.get("/rank/{user_id}")
async def reset_user_rank(user_id: int, page: int = 0):
    try:
        insert_recommendation_rank(user_id=user_id, index=page)
        return Response(content= 'b', status_code=200)
    except Exception as e:
        print(e)
        return

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