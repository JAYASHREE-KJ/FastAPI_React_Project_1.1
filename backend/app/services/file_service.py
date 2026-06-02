import os
from fastapi import UploadFile

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

async def save_file(file: UploadFile):
    file_location = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_location, "wb") as f:
        while chunk := await file.read(1024):
            f.write(chunk)

    return file_location


def get_file_path(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)
    return file_path
