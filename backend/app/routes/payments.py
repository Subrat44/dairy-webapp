from fastapi import APIRouter, HTTPException, Request, Header
from app.models.models import PaymentVerify
from app.database import get_db
from bson import ObjectId
import razorpay
import hmac
import hashlib
import os
import json

router = APIRouter()

RAZORPAY_KEY    = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")


@router.post("/verify")
async def verify_payment(body: PaymentVerify):
    """Verify Razorpay payment signature after frontend checkout."""
    db = get_db()

    # Verify signature
    expected = hmac.new(
        RAZORPAY_SECRET.encode(),
        f"{body.razorpay_order_id}|{body.razorpay_payment_id}".encode(),
        hashlib.sha256
    ).hexdigest()

    if expected != body.razorpay_signature:
        raise HTTPException(status_code=400, detail="Invalid payment signature")

    # Update order in DB
    result = await db.orders.update_one(
        {"_id": ObjectId(body.order_id)},
        {"$set": {
            "payment_id": body.razorpay_payment_id,
            "payment_status": "paid",
            "status": "confirmed",
            "razorpay_order_id": body.razorpay_order_id,
        }}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")

    return {"success": True, "message": "Payment verified, order confirmed!"}


@router.post("/webhook")
async def razorpay_webhook(
    request: Request,
    x_razorpay_signature: str = Header(None)
):
    """Razorpay server-to-server webhook for payment events."""
    db = get_db()
    body_bytes = await request.body()

    # Verify webhook signature
    expected = hmac.new(
        RAZORPAY_SECRET.encode(),
        body_bytes,
        hashlib.sha256
    ).hexdigest()

    if expected != x_razorpay_signature:
        raise HTTPException(status_code=400, detail="Invalid webhook signature")

    event = json.loads(body_bytes)
    event_type = event.get("event")

    if event_type == "payment.captured":
        payment = event["payload"]["payment"]["entity"]
        rz_order_id = payment.get("order_id")
        payment_id  = payment.get("id")

        if rz_order_id:
            await db.orders.update_one(
                {"razorpay_order_id": rz_order_id},
                {"$set": {
                    "payment_id": payment_id,
                    "payment_status": "paid",
                    "status": "confirmed",
                }}
            )

    elif event_type == "payment.failed":
        payment = event["payload"]["payment"]["entity"]
        rz_order_id = payment.get("order_id")
        if rz_order_id:
            await db.orders.update_one(
                {"razorpay_order_id": rz_order_id},
                {"$set": {"payment_status": "failed"}}
            )

    return {"received": True}