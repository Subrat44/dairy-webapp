


from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime


# ── USER MODELS ──────────────────────────────────────────
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: str
    name: str
    email: str
    phone: Optional[str] = None
    created_at: datetime

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


# ── PRODUCT MODELS ───────────────────────────────────────
class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    original_price: Optional[float] = None
    unit: str
    category: str        # Milk | Paneer | Butter | Ghee
    image: str
    badge: Optional[str] = None
    in_stock: bool = True

class ProductOut(ProductCreate):
    id: str
    created_at: datetime

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    original_price: Optional[float] = None
    unit: Optional[str] = None
    category: Optional[str] = None
    image: Optional[str] = None
    badge: Optional[str] = None
    in_stock: Optional[bool] = None


# ── ORDER MODELS ─────────────────────────────────────────
class CartItem(BaseModel):
    product_id: str
    name: str
    price: float
    qty: int
    image: str

class OrderCreate(BaseModel):
    items: List[CartItem]
    total: float
    address: str
    phone: str

class OrderOut(BaseModel):
    id: str
    user_id: str
    items: List[CartItem]
    total: float
    address: str
    phone: str
    status: str          # pending | confirmed | delivered | cancelled
    payment_id: Optional[str] = None
    payment_status: str  # pending | paid | failed
    created_at: datetime


# ── PAYMENT MODELS ───────────────────────────────────────
class PaymentVerify(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    order_id: str        # our internal order id