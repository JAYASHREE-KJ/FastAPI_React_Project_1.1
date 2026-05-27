from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.patient import Patient
from app.schemas.patient import PatientCreate, PatientResponse

router = APIRouter(prefix="/patients", tags=["Patients"])

@router.post("/", response_model=PatientResponse)
def create_patient(patient: PatientCreate, db: Session = Depends(get_db)):
    new_patient = Patient(**patient.dict())
    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)
    return new_patient

@router.get("/", response_model=list[PatientResponse])
def get_patients(db: Session = Depends(get_db)):
    return db.query(Patient).all()


@router.get("/{id}", response_model=PatientResponse)
def get_patient(id: int, db: Session = Depends(get_db)):
    return db.query(Patient).filter(Patient.id == id).first()


@router.put("/{id}")
def update_patient(id: int, patient: PatientCreate, db: Session = Depends(get_db)):
    db_patient = db.query(Patient).filter(Patient.id == id).first()
    for key, value in patient.dict().items():
        setattr(db_patient, key, value)
    db.commit()
    return {"message": "Updated"}

@router.delete("/{id}")
def delete_patient(id: int, db: Session = Depends(get_db)):
    db_patient = db.query(Patient).filter(Patient.id == id).first()
    db.delete(db_patient)
    db.commit()
    return {"message": "Deleted"}

from app.schemas.patient import PatientUpdate
from fastapi import HTTPException

@router.patch("/{id}", response_model=PatientResponse)
def patch_patient(id: int, data: PatientUpdate, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.id == id).first()

    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    update_data = data.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(patient, key, value)

    db.commit()
    db.refresh(patient)

    return patient