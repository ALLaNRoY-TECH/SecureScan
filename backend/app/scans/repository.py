from typing import Optional, List
from sqlalchemy.orm import Session
from app.scans.models import ScanJob, ScanStatus
from app.projects.models import Project

class ScanRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id_and_workspace(self, scan_id: str, workspace_id: str) -> Optional[ScanJob]:
        return self.db.query(ScanJob).join(Project).filter(
            ScanJob.id == scan_id,
            Project.workspace_id == workspace_id
        ).first()

    def get_by_id(self, scan_id: str) -> Optional[ScanJob]:
        return self.db.query(ScanJob).filter(ScanJob.id == scan_id).first()

    def create(self, project_id: str, target_url: str, scan_type: str) -> ScanJob:
        scan_job = ScanJob(
            project_id=project_id,
            target_url=target_url,
            scan_type=scan_type
        )
        self.db.add(scan_job)
        self.db.commit()
        self.db.refresh(scan_job)
        return scan_job

    def update_status(self, scan_id: str, status: ScanStatus) -> Optional[ScanJob]:
        scan = self.get_by_id(scan_id)
        if scan:
            scan.status = status
            self.db.commit()
            self.db.refresh(scan)
        return scan
