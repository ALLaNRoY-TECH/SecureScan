from typing import List
from sqlalchemy.orm import Session
from app.projects.repository import ProjectRepository
from app.projects.schemas import ProjectCreate, ProjectResponse, TargetCreate, TargetResponse
from app.projects.models import Project, Target

class ProjectService:
    def __init__(self, db: Session):
        self.repo = ProjectRepository(db)

    def get_projects(self, workspace_id: str) -> List[Project]:
        return self.repo.get_all_by_workspace(workspace_id)

    def create_project(self, project_in: ProjectCreate, workspace_id: str) -> Project:
        return self.repo.create(project_in, workspace_id)

    def add_target_to_project(self, project_id: str, target_in: TargetCreate, workspace_id: str) -> Target:
        project = self.repo.get_by_id_and_workspace(project_id, workspace_id)
        if not project:
            raise ValueError("Project not found")
        return self.repo.create_target(project.id, target_in)
