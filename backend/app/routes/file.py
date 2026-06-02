from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
import os

from app.services.file_service import save_file, get_file_path

router = APIRouter()

@router.post("/upload/single")
async def upload_single_file(file: UploadFile = File(...)):
    file_location = await save_file(file)

    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "saved_at": file_location
    }


@router.get("/download/{filename}")
async def download_file(filename: str):
    file_path = get_file_path(filename)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")

    return FileResponse(
        path=file_path,
        media_type="application/octet-stream",
        filename=filename
    )