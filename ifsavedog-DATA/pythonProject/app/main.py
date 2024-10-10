from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from app.api.v1.endpoints import router as api_router
from beanie import init_beanie
from contextlib import asynccontextmanager
from app.db.mongo import connect_to_mongo, close_mongo_connection
from app.models.dog import Dog
from app.core.config import CORS_CONFIG

@asynccontextmanager
async def lifespan(app: FastAPI):
    db = await connect_to_mongo()    
    await init_beanie(database=db, document_models=[Dog])
    try:
        yield
    finally:
        await close_mongo_connection()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_CONFIG["allow_origins"],
    allow_credentials=CORS_CONFIG["allow_credentials"],
    allow_methods=CORS_CONFIG["allow_methods"],
    allow_headers=CORS_CONFIG["allow_headers"],
)

app.include_router(api_router) 
