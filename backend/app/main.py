from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, products, orders, payments
from app.database import connect_db, close_db

app = FastAPI(
    title="DairyHub API",
    description="Backend API for DairyHub e-commerce",
    version="1.0.0"
)

# CORS — allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB lifecycle
app.add_event_handler("startup", connect_db)
app.add_event_handler("shutdown", close_db)

# Routes
app.include_router(auth.router,     prefix="/api/auth",     tags=["Auth"])
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(orders.router,   prefix="/api/orders",   tags=["Orders"])
app.include_router(payments.router, prefix="/api/payments", tags=["Payments"])

@app.get("/")
def health():
    return {"status": "ok", "service": "DairyHub API"}