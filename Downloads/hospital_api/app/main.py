from fastapi import FastAPI
from app.db import engine, Base


from app.routes import patient as patient_routes
from app.routes import doctor as doctor_routes
from app.routes import appointment as appointment_routes
from app.routes import prescription as prescription_routes


from app.models import patient, doctor, appointment, prescription

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hospital API Running 🚀"}

app.include_router(patient_routes.router, prefix="/patients", tags=["Patients"])
app.include_router(doctor_routes.router, prefix="/doctors", tags=["Doctors"])
app.include_router(appointment_routes.router, prefix="/appointments", tags=["Appointments"])
app.include_router(prescription_routes.router, prefix="/prescriptions", tags=["Prescriptions"])