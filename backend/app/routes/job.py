from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlmodel import (
    Session,
    select
)

from app.logger import logger

from app.database import (
    get_session
)

from app.models.job import Job

from app.schemas.job import (
    JobCreate,
    JobUpdate
)

from app.crud.job import (
    create_job,
    get_jobs as crud_get_jobs,
    update_job,
    delete_job
)



router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


@router.post("/")
def add_job(

    job: JobCreate,

    session: Session = Depends(
        get_session
    )
):

    logger.info(
        f"Creating Job: "
        f"{job.company}"
    )

    return create_job(
        session,
        job
    )


@router.get("/")
def get_jobs(

    search: str = "",

    page: int = 1,

    limit: int = 5,

    session: Session = Depends(
        get_session
    )
):

    offset = (
        page - 1
    ) * limit

    logger.info(
        f"Fetching Jobs | "
        f"Page: {page} | "
        f"Search: {search}"
    )

    query = select(Job)

    if search:

        query = query.where(
            Job.company.ilike(
                f"%{search}%"
            )
        )

    total_results = session.exec(
        query
    ).all()

    jobs = session.exec(

        query.offset(offset)
        .limit(limit)

    ).all()

    return {

        "jobs": jobs,

        "totalPages":

        (
            len(total_results)
            + limit - 1
        ) // limit
    }


@router.put("/{job_id}")
def edit_job(

    job_id: int,

    updated_job: JobUpdate,

    session: Session = Depends(
        get_session
    )
):

    logger.info(
        f"Updating Job ID: "
        f"{job_id}"
    )

    job = update_job(

        session,
        job_id,
        updated_job
    )

    if not job:

        logger.error(
            f"Job Not Found: "
            f"{job_id}"
        )

        raise HTTPException(

            status_code=404,

            detail="Job not found"
        )

    return job


@router.delete("/{job_id}")
def remove_job(

    job_id: int,

    session: Session = Depends(
        get_session
    )
):

    logger.warning(
        f"Deleting Job ID: "
        f"{job_id}"
    )

    deleted = delete_job(
        session,
        job_id
    )

    if not deleted:

        logger.error(
            f"Delete Failed | "
            f"Job Not Found: "
            f"{job_id}"
        )

        raise HTTPException(

            status_code=404,

            detail="Job not found"
        )

    return {
        "message":
        "Deleted successfully"
    }