from fastapi import APIRouter, BackgroundTasks
from app.services.background import save_log

router = APIRouter()

@router.post("/background")
async def background_task(background_tasks: BackgroundTasks):
    background_tasks.add_task(
        save_log,
        "User triggered background task"
    )

    return {
        "message": "Task running in background"
    }