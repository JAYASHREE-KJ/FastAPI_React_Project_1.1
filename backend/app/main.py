from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import create_db_and_tables
from app.routes.job import router as job_router
from app.routes.auth import router as auth_router
from app.routes.file import router as file_router
from app.routes.background import router as bg_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Application Starting...")
    create_db_and_tables()
    yield
    print("Application Shutting Down...")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(job_router)
app.include_router(auth_router)
app.include_router(file_router)
app.include_router(bg_router)

@app.get("/")
def home():
    return {"message": "FastAPI Running"}