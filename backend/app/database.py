from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DB_NAME   = os.getenv("DB_NAME", "dairyhub")

class Database:
    client: AsyncIOMotorClient = None
    db = None

db = Database()

async def connect_db():
    db.client = AsyncIOMotorClient(MONGO_URL)
    db.db     = db.client[DB_NAME]
    print(f"✅ Connected to MongoDB: {DB_NAME}")

async def close_db():
    if db.client:
        db.client.close()
        print("MongoDB connection closed")

def get_db():
    return db.db