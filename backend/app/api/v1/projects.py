from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.shared.database import get_db
from app.api.deps import get_current_user
from app.models.models import User, Project, Target
from app.schemas.project import ProjectCreate, ProjectResponse, TargetCreate, TargetResponse

router = APIRouter()

@router.get("/", response_model=List[ProjectResponse])
def get_projects(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # In a real multi-tenant app, we'd filter by workspace, not user id
    projects = db.query(Project).filter(Project.workspace_id == current_user.workspace_id).all()
    return projects

@router.post("/", response_model=ProjectResponse)
def create_project(project_in: ProjectCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    project = Project(
        name=project_in.name,
        description=project_in.description,
        workspace_id=current_user.workspace_id
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

@router.post("/{project_id}/targets", response_model=TargetResponse)
def add_target(project_id: str, target_in: TargetCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    project = db.query(Project).filter(Project.id == project_id, Project.workspace_id == current_user.workspace_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    target = Target(
        project_id=project.id,
        url=str(target_in.url),
        environment=target_in.environment,
        tech_stack=target_in.tech_stack
    )
    db.add(target)
    db.commit()
    db.refresh(target)
    return target
