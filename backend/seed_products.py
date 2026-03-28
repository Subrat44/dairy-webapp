import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv("backend/.env")

MONGODB_URL = os.getenv("MONGODB_URL")
DB_NAME = os.getenv("DATABASE_NAME", "dairyhub")

products = [
  {"name": "Full Cream Milk", "description": "Rich, creamy milk from grass-fed cows. Tested fresh daily.", "price": 35, "unit": "500ml", "category": "Milk", "image": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=80", "badge": "Bestseller", "stock": 100, "in_stock": True},
  {"name": "Toned Milk", "description": "Low-fat toned milk — perfect for health-conscious households.", "price": 55, "unit": "1L", "category": "Milk", "image": "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=80", "stock": 100, "in_stock": True},
  {"name": "Organic Cow Ghee", "description": "Hand-churned A2 cow ghee. Rich in nutrients, pure golden flavour.", "price": 499, "original_price": 599, "unit": "500g", "category": "Ghee", "image": "https://images.unsplash.com/photo-1630450202872-e0829c9d6172?w=300&q=80", "badge": "Organic", "stock": 50, "in_stock": True},
  {"name": "Desi Ghee", "description": "Traditional desi ghee prepared using the bilona method.", "price": 279, "unit": "250g", "category": "Ghee", "image": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&q=80", "stock": 50, "in_stock": True},
  {"name": "White Butter", "description": "Unsalted, creamy butter made fresh from whole milk every morning.", "price": 120, "unit": "200g", "category": "Butter", "image": "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&q=80", "badge": "Fresh Daily", "stock": 75, "in_stock": True},
  {"name": "Salted Butter", "description": "Lightly salted, spreadable butter for toast and baking.", "price": 75, "unit": "100g", "category": "Butter", "image": "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=80", "stock": 75, "in_stock": True},
  {"name": "Fresh Paneer", "description": "Soft, moist paneer made from full-cream milk — zero additives.", "price": 90, "unit": "200g", "category": "Paneer", "image": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&q=80", "badge": "Made Today", "stock": 60, "in_stock": True},
  {"name": "Malai Paneer", "description": "Extra-rich malai paneer for curries, tikkas and desserts.", "price": 199, "original_price": 220, "unit": "500g", "category": "Paneer", "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&q=80", "stock": 60, "in_stock": True},
]

async def seed():
    client = AsyncIOMotorClient(MONGODB_URL)
    db = client[DB_NAME]
    await db.products.delete_many({})  # clear existing
    result = await db.products.insert_many(products)
    print(f"✅ Inserted {len(result.inserted_ids)} products!")
    client.close()

asyncio.run(seed())
