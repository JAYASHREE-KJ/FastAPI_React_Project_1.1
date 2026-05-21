from contextlib import asynccontextmanager

from fastapi import FastAPI

from fastapi.middleware.cors import (
    CORSMiddleware
)

from app.database import (
    create_db_and_tables
)

from app.routes.job import router


@asynccontextmanager
async def lifespan(app: FastAPI):

    print(
        "Application Starting..."
    )

    create_db_and_tables()

    yield

    print(
        "Application Shutting Down..."
    )


app = FastAPI(
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def home():

    return {
        "message":
        "FastAPI Running"
    }