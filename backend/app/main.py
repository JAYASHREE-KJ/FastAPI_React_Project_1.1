from contextlib import asynccontextmanager
from passlib.context import CryptContext
from datetime import datetime, time, timedelta, timezone
from jose import JWTError, jwt
from fastapi import FastAPI, File, UploadFile, Form, HTTPException,BackgroundTasks
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import time

from app.database import create_db_and_tables
from app.routes.job import router

import os

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Application Starting...")
    create_db_and_tables()
    yield
    print("Application Shutting Down...")


app = FastAPI(lifespan=lifespan)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------- ROUTES ---------
app.include_router(router)

# ------- HOME ----------
@app.get("/")
def home():
    return {"message": "FastAPI Running"}

# ------- FILE UPLOAD --------
@app.post("/upload/single")
async def upload_single_file(file: UploadFile = File(...)):
    file_location = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_location, "wb") as f:
        while chunk := await file.read(1024):   
            f.write(chunk)

    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "saved_at": file_location
    }

# ------- FILE DOWNLOAD ---------
@app.get("/download/{filename}")
async def download_file(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(
        path=file_path,
        media_type="application/octet-stream",
        filename=filename
    )

# ---------------- AUTH CONFIG ----------------
SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15
REFRESH_TOKEN_EXPIRE_DAYS = 7

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

# ✅ Temporary DB (memory)
users_db = {}

# ------ PASSWORD -------
def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

# ------ TOKEN ---------
def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({
        "exp": expire.timestamp(),   
        "type": "access"
    })

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)

    to_encode.update({
        "exp": expire.timestamp(),   
        "type": "refresh"
    })

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None
    
def save_log(message: str):
    time.sleep(5)
    with open("log.txt", "a") as f:
        f.write(message + "\n")

# ------ AUTH ROUTES-------

# REGISTER
@app.post("/register")
def register(username: str = Form(...), password: str = Form(...)):
    if username in users_db:
        raise HTTPException(status_code=400, detail="User already exists")

    users_db[username] = hash_password(password)

    return {"message": "User created successfully"}

# LOGIN
@app.post("/login")
def login(username: str = Form(...), password: str = Form(...)):
    stored = users_db.get(username)

    if not stored:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(password, stored):
        raise HTTPException(status_code=401, detail="Invalid password")

    return {
        "access_token": create_access_token({"sub": username}),
        "refresh_token": create_refresh_token({"sub": username})
    }

# REFRESH
@app.post("/refresh")
def refresh(refresh_token: str = Form(...)):
    payload = decode_token(refresh_token)

    if not payload or payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    return {
        "access_token": create_access_token({"sub": payload["sub"]})
    }

# PROTECTED
@app.get("/protected")
def protected(token: str):
    payload = decode_token(token)

    if not payload or payload.get("type") != "access":
        raise HTTPException(status_code=401, detail="Invalid token")

    return {
        "message": "Access granted",
        "user": payload.get("sub")
    }


@app.post("/background")
async def background_task(
    background_tasks: BackgroundTasks
):
    background_tasks.add_task(
        save_log,
        "User triggered background task"
    )

    return {
        "message": "Task running in background"
    }