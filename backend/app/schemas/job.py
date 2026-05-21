from sqlmodel import SQLModel
from datetime import date

class JobCreate(SQLModel):
    company: str
    role: str
    status: str
    applied_date: date

class JobUpdate(SQLModel):
    company: str
    role: str
    status: str
    applied_date: date