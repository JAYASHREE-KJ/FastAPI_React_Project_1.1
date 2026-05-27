from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.prescription import Prescription
from app.schemas.prescription import PrescriptionResponse

router = APIRouter(prefix="/prescriptions", tags=["Prescriptions"])

@router.post("/")
def create_prescription(data: dict, db: Session = Depends(get_db)):
    pres = Prescription(**data)
    db.add(pres)
    db.commit()
    db.refresh(pres)
    return pres

@router.get("/", response_model=list[PrescriptionResponse])
def get_prescriptions(db: Session = Depends(get_db)):
    return db.query(Prescription).all()