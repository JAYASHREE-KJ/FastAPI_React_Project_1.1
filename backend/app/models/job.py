from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import date

class Job(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    company: str
    role: str
    status: str
    applied_date: date