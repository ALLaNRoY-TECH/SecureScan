from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.shared.database import get_db
from app.api.deps import get_current_user
from app.models.models import User
from app.projects.schemas import ProjectCreate, ProjectResponse, TargetCreate, TargetResponse
from app.projects.service import ProjectService
from app.shared.responses import APIResponse, success_response, error_response

router = APIRouter(tags=["projects"])

def get_project_service(db: Session = Depends(get_db)) -> ProjectService:
    return ProjectService(db)

@router.get("/", response_model=APIResponse[List[ProjectResponse]])
def get_projects(
    service: ProjectService = Depends(get_project_service),
    current_user: User = Depends(get_current_user)
):
    projects = service.get_projects(workspace_id=current_user.workspace_id)
    return success_response(data=projects)

@router.post("/", response_model=APIResponse[ProjectResponse])
def create_project(
    project_in: ProjectCreate,
    service: ProjectService = Depends(get_project_service),
    current_user: User = Depends(get_current_user)
):
    project = service.create_project(project_in, workspace_id=current_user.workspace_id)
    return success_response(data=project)

@router.post("/{project_id}/targets", response_model=APIResponse[TargetResponse])
def add_target(
    project_id: str, 
    target_in: TargetCreate,
    service: ProjectService = Depends(get_project_service),
    current_user: User = Depends(get_current_user)
):
    try:
        target = service.add_target_to_project(project_id, target_in, current_user.workspace_id)
        return success_response(data=target)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
