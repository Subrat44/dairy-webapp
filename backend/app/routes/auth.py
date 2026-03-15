from fastapi import APIRouter, HTTPException, Depends
from app.models.models import UserRegister, UserLogin, TokenResponse, UserOut
from app.middleware.auth import hash_password, verify_password, create_access_token
from app.database import get_db
from datetime import datetime
from bson import ObjectId

router = APIRouter()


def user_to_out(user: dict) -> UserOut:
    return UserOut(
        id=str(user["_id"]),
        name=user["name"],
        email=user["email"],
        phone=user.get("phone"),
        created_at=user["created_at"],
    )


@router.post("/register", response_model=TokenResponse, status_code=201)
async def register(body: UserRegister):
    db = get_db()

    # Check duplicate email
    if await db.users.find_one({"email": body.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    user_doc = {
        "name": body.name,
        "email": body.email,
        "password": hash_password(body.password),
        "phone": body.phone,
        "created_at": datetime.utcnow(),
    }
    result = await db.users.insert_one(user_doc)
    user_doc["_id"] = result.inserted_id

    token = create_access_token({"sub": str(result.inserted_id), "email": body.email})
    return TokenResponse(access_token=token, user=user_to_out(user_doc))


@router.post("/login", response_model=TokenResponse)
async def login(body: UserLogin):
    db = get_db()

    user = await db.users.find_one({"email": body.email})
    if not user or not verify_password(body.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token({"sub": str(user["_id"]), "email": user["email"]})
    return TokenResponse(access_token=token, user=user_to_out(user))


@router.get("/me", response_model=UserOut)
async def me(current_user: dict = Depends(get_current_user_dep := __import__(
    'app.middleware.auth', fromlist=['get_current_user']).get_current_user)):
    db = get_db()
    user = await db.users.find_one({"_id": ObjectId(current_user["user_id"])})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user_to_out(user)