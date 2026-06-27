from typing import List, Optional
from sqlalchemy.orm import Session
from app.vulnerabilities.models import Vulnerability

class VulnerabilityRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_project(self, project_id: str) -> List[Vulnerability]:
        return self.db.query(Vulnerability).filter(Vulnerability.project_id == project_id).all()

    def get_by_scan(self, scan_id: str) -> List[Vulnerability]:
        return self.db.query(Vulnerability).filter(Vulnerability.scan_id == scan_id).all()
