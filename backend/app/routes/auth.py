from fastapi import APIRouter, Form, HTTPException

from app.core.security import (
    users_db, hash_password, verify_password,
    create_access_token, create_refresh_token, decode_token
)

router = APIRouter()

@router.post("/register")
def register(username: str = Form(...), password: str = Form(...)):
    if username in users_db:
        raise HTTPException(status_code=400, detail="User already exists")

    users_db[username] = hash_password(password)

    return {"message": "User created successfully"}


@router.post("/login")
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


@router.post("/refresh")
def refresh(refresh_token: str = Form(...)):
    payload = decode_token(refresh_token)

    if not payload or payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    return {
        "access_token": create_access_token({"sub": payload["sub"]})
    }


@router.get("/protected")
def protected(token: str):
    payload = decode_token(token)

    if not payload or payload.get("type") != "access":
        raise HTTPException(status_code=401, detail="Invalid token")

    return {
        "message": "Access granted",
        "user": payload.get("sub")
    }