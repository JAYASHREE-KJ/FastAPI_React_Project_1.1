from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.appointment import Appointment
from app.schemas.appointment import AppointmentResponse

router = APIRouter(prefix="/appointments", tags=["Appointments"])


@router.post("/")
def create_appointment(data: dict, db: Session = Depends(get_db)):
    appt = Appointment(**data)
    db.add(appt)
    db.commit()
    db.refresh(appt)
    return appt

@router.get("/", response_model=list[AppointmentResponse])
def get_appointments(db: Session = Depends(get_db)):
    return db.query(Appointment).all()

