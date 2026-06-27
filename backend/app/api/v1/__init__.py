from fastapi import APIRouter
from app.api.v1 import scans
from app.projects.router import router as projects_router

api_router = APIRouter()
api_router.include_router(projects_router, prefix="/projects", tags=["projects"])
api_router.include_router(scans.router, prefix="/scans", tags=["scans"])
