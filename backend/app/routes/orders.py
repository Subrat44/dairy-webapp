from fastapi import APIRouter, HTTPException, Depends
from app.models.models import OrderCreate, OrderOut
from app.middleware.auth import get_current_user
from app.database import get_db
from datetime import datetime
from bson import ObjectId
from typing import List
import os
import razorpay

router = APIRouter()

RAZORPAY_KEY    = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")


def order_to_out(o: dict) -> dict:
    o["id"] = str(o["_id"])
    return o


@router.post("/", response_model=dict, status_code=201)
async def create_order(
    body: OrderCreate,
    current_user: dict = Depends(get_current_user)
):
    db = get_db()

    # Create Razorpay order
    rz_order = None
    try:
        client = razorpay.Client(auth=(RAZORPAY_KEY, RAZORPAY_SECRET))
        rz_order = client.order.create({
            "amount": int(body.total * 100),   # paise
            "currency": "INR",
            "payment_capture": 1
        })
    except Exception as e:
        print(f"Razorpay order creation failed: {e}")

    doc = {
        "user_id": current_user["user_id"],
        "items": [item.dict() for item in body.items],
        "total": body.total,
        "address": body.address,
        "phone": body.phone,
        "status": "pending",
        "payment_status": "pending",
        "razorpay_order_id": rz_order["id"] if rz_order else None,
        "payment_id": None,
        "created_at": datetime.utcnow(),
    }

    result = await db.orders.insert_one(doc)
    doc["_id"] = result.inserted_id

    return {
        **order_to_out(doc),
        "razorpay_order_id": rz_order["id"] if rz_order else None,
        "razorpay_key": RAZORPAY_KEY,
    }


@router.get("/my", response_model=List[dict])
async def my_orders(current_user: dict = Depends(get_current_user)):
    db = get_db()
    orders = await db.orders.find(
        {"user_id": current_user["user_id"]}
    ).sort("created_at", -1).to_list(50)
    return [order_to_out(o) for o in orders]


@router.get("/{order_id}", response_model=dict)
async def get_order(
    order_id: str,
    current_user: dict = Depends(get_current_user)
):
    db = get_db()
    order = await db.orders.find_one({
        "_id": ObjectId(order_id),
        "user_id": current_user["user_id"]
    })
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order_to_out(order)


@router.patch("/{order_id}/cancel", response_model=dict)
async def cancel_order(
    order_id: str,
    current_user: dict = Depends(get_current_user)
):
    db = get_db()
    order = await db.orders.find_one({
        "_id": ObjectId(order_id),
        "user_id": current_user["user_id"]
    })
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order["status"] not in ("pending", "confirmed"):
        raise HTTPException(status_code=400, detail="Order cannot be cancelled")

    await db.orders.update_one(
        {"_id": ObjectId(order_id)},
        {"$set": {"status": "cancelled"}}
    )
    order["status"] = "cancelled"
    return order_to_out(order)