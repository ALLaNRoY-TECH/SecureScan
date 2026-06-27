from fastapi import APIRouter
from app.scans.router import router as scans_router
from app.projects.router import router as projects_router

api_router = APIRouter()
api_router.include_router(projects_router, prefix="/projects", tags=["projects"])
api_router.include_router(scans_router, prefix="/scans", tags=["scans"])
