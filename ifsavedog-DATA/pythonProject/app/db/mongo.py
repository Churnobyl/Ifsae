from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

mongo_client = None
db = None

async def connect_to_mongo():
  global mongo_client, db
  mongo_client = AsyncIOMotorClient(settings.MONGO_URL)
  db = mongo_client[settings.MONGO_DBNAME]
  print("connect to mongo")
  print(f"Connected to MongoDB: {db.name}") 
  return db
  
async def close_mongo_connection():
  mongo_client.close()