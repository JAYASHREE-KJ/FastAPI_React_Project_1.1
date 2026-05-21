from sqlmodel import Session, select
from app.models.job import Job
from app.schemas.job import JobCreate, JobUpdate

def create_job(session: Session, job_data: JobCreate):
    job = Job.model_validate(job_data)

    session.add(job)
    session.commit()
    session.refresh(job)

    return job

def get_jobs(session: Session):
    statement = select(Job)
    return session.exec(statement).all()

def update_job(session: Session, job_id: int, updated_data: JobUpdate):
    job = session.get(Job, job_id)

    if not job:
        return None

    update_dict = updated_data.model_dump()

    for key, value in update_dict.items():
        setattr(job, key, value)

    session.add(job)
    session.commit()
    session.refresh(job)

    return job

def delete_job(session: Session, job_id: int):
    job = session.get(Job, job_id)

    if not job:
        return False

    session.delete(job)
    session.commit()

    return True