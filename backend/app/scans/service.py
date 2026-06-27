from sqlalchemy.orm import Session
from fastapi import BackgroundTasks
from app.scans.repository import ScanRepository
from app.scans.schemas import ScanCreate
from app.scans.models import ScanJob
from app.projects.repository import ProjectRepository
from app.scans.orchestrator import run_orchestrator

class ScanService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = ScanRepository(db)
        self.project_repo = ProjectRepository(db)

    def launch_scan(self, scan_in: ScanCreate, workspace_id: str, background_tasks: BackgroundTasks) -> ScanJob:
        project = self.project_repo.get_by_id_and_workspace(scan_in.project_id, workspace_id)
        if not project:
            raise ValueError("Project not found")

        scan_job = self.repo.create(
            project_id=project.id,
            target_url=scan_in.target_url,
            scan_type=scan_in.scan_type
        )

        # Queue the orchestrator
        background_tasks.add_task(run_orchestrator, scan_job.id, self.db)
        return scan_job

    def get_scan(self, scan_id: str, workspace_id: str) -> ScanJob:
        scan = self.repo.get_by_id_and_workspace(scan_id, workspace_id)
        if not scan:
            raise ValueError("Scan not found")
        return scan
