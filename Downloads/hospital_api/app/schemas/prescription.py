from pydantic import BaseModel
from app.schemas.appointment import AppointmentResponse

class PrescriptionBase(BaseModel):
    appointment_id: int
    medicines: str
    notes: str

class PrescriptionCreate(PrescriptionBase):
    pass

class PrescriptionResponse(BaseModel):
    id: int
    medicines: str
    notes: str
    appointment: AppointmentResponse

    class Config:
        from_attributes = True