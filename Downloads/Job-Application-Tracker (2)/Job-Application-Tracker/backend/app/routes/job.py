from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.database import get_session
from app.schemas.job import JobCreate, JobUpdate
from app.crud.job import (
    create_job,
    get_jobs,
    update_job,
    delete_job
)

router = APIRouter(prefix="/jobs", tags=["Jobs"])

@router.post("/")
def add_job(job: JobCreate, session: Session = Depends(get_session)):
    return create_job(session, job)

@router.get("/")
def fetch_jobs(session: Session = Depends(get_session)):
    return get_jobs(session)

@router.put("/{job_id}")
def edit_job(
    job_id: int,
    updated_job: JobUpdate,
    session: Session = Depends(get_session)
):
    job = update_job(session, job_id, updated_job)

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    return job

@router.delete("/{job_id}")
def remove_job(job_id: int, session: Session = Depends(get_session)):
    deleted = delete_job(session, job_id)

    if not deleted:
        raise HTTPException(status_code=404, detail="Job not found")

    return {"message": "Deleted successfully"}