from typing import List, Optional
from sqlalchemy.orm import Session
from app.projects.models import Project, Target
from app.projects.schemas import ProjectCreate, TargetCreate

class ProjectRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all_by_workspace(self, workspace_id: str) -> List[Project]:
        return self.db.query(Project).filter(Project.workspace_id == workspace_id).all()

    def get_by_id_and_workspace(self, project_id: str, workspace_id: str) -> Optional[Project]:
        return self.db.query(Project).filter(
            Project.id == project_id, 
            Project.workspace_id == workspace_id
        ).first()

    def create(self, project_in: ProjectCreate, workspace_id: str) -> Project:
        project = Project(
            name=project_in.name,
            description=project_in.description,
            workspace_id=workspace_id
        )
        self.db.add(project)
        self.db.commit()
        self.db.refresh(project)
        return project

    def create_target(self, project_id: str, target_in: TargetCreate) -> Target:
        target = Target(
            project_id=project_id,
            url=str(target_in.url),
            environment=target_in.environment,
            tech_stack=target_in.tech_stack
        )
        self.db.add(target)
        self.db.commit()
        self.db.refresh(target)
        return target
