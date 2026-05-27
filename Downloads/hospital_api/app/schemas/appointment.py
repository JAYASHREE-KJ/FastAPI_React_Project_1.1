from pydantic import BaseModel
from app.schemas.patient import PatientResponse
from app.schemas.doctor import DoctorResponse

class AppointmentBase(BaseModel):
    patient_id: int
    doctor_id: int
    status: str

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentResponse(AppointmentBase):
    id: int
    patient: PatientResponse
    doctor: DoctorResponse

    class Config:
        from_attributes = True