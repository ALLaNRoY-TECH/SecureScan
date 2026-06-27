from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.scans.models import ScanStatus

class ScanCreate(BaseModel):
    project_id: str
    target_url: str
    scan_type: str = "Quick Scan"

class ScanResponse(BaseModel):
    id: str
    project_id: str
    target_url: str
    status: ScanStatus
    scan_type: str
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None

    class Config:
        from_attributes = True
