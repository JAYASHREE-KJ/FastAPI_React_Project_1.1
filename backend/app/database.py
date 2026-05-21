import os

from pathlib import Path
from dotenv import load_dotenv
from sqlmodel import SQLModel, create_engine, Session

BASE_DIR = Path(__file__).resolve().parent.parent

env_path = BASE_DIR / ".env"

load_dotenv(dotenv_path=env_path)

DATABASE_URL = os.getenv("DATABASE_URL")

print("ENV PATH =", env_path)
print("DATABASE_URL =", DATABASE_URL)

engine = create_engine(
    DATABASE_URL,
    echo=True
)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session