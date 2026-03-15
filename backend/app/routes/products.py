from fastapi import APIRouter, HTTPException, Depends, Query
from app.models.models import ProductCreate, ProductOut, ProductUpdate
from app.middleware.auth import get_current_user
from app.database import get_db
from datetime import datetime
from bson import ObjectId
from typing import Optional, List

router = APIRouter()


def product_to_out(p: dict) -> dict:
    p["id"] = str(p["_id"])
    del p["_id"]
    return p


@router.get("/", response_model=List[dict])
async def get_products(
    category: Optional[str] = Query(None),
    in_stock: Optional[bool] = Query(None),
):
    db = get_db()
    query = {}
    if category:
        query["category"] = category
    if in_stock is not None:
        query["in_stock"] = in_stock

    products = await db.products.find(query).to_list(100)
    return [product_to_out(p) for p in products]


@router.get("/{product_id}", response_model=dict)
async def get_product(product_id: str):
    db = get_db()
    p = await db.products.find_one({"_id": ObjectId(product_id)})
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    return product_to_out(p)


@router.post("/", response_model=dict, status_code=201)
async def create_product(
    body: ProductCreate,
    current_user: dict = Depends(get_current_user)
):
    db = get_db()
    doc = body.dict()
    doc["created_at"] = datetime.utcnow()
    result = await db.products.insert_one(doc)
    doc["_id"] = result.inserted_id
    return product_to_out(doc)


@router.patch("/{product_id}", response_model=dict)
async def update_product(
    product_id: str,
    body: ProductUpdate,
    current_user: dict = Depends(get_current_user)
):
    db = get_db()
    updates = {k: v for k, v in body.dict().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")

    result = await db.products.update_one(
        {"_id": ObjectId(product_id)},
        {"$set": updates}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")

    updated = await db.products.find_one({"_id": ObjectId(product_id)})
    return product_to_out(updated)


@router.delete("/{product_id}", status_code=204)
async def delete_product(
    product_id: str,
    current_user: dict = Depends(get_current_user)
):
    db = get_db()
    result = await db.products.delete_one({"_id": ObjectId(product_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")