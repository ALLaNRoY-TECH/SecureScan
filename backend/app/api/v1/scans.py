from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.shared.database import get_db
from app.api.deps import get_current_user
from app.models.models import User, ScanJob, ScanStatus
from app.projects.models import Project
from app.schemas.scan import ScanCreate, ScanResponse
import time

from app.scanners.orchestrator import run_orchestrator

router = APIRouter()

@router.post("/launch", response_model=ScanResponse)
def launch_scan(scan_in: ScanCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    project = db.query(Project).filter(Project.id == scan_in.project_id, Project.workspace_id == current_user.workspace_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    scan_job = ScanJob(
        project_id=project.id,
        target_url=scan_in.target_url,
        scan_type=scan_in.scan_type
    )
    db.add(scan_job)
    db.commit()
    db.refresh(scan_job)

    # Queue the real orchestrator in the background
    background_tasks.add_task(run_orchestrator, scan_job.id, db)

    return scan_job

@router.get("/{scan_id}", response_model=ScanResponse)
def get_scan_status(scan_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # We join with project to ensure ownership
    scan = db.query(ScanJob).join(Project).filter(
        ScanJob.id == scan_id,
        Project.workspace_id == current_user.workspace_id
    ).first()
    
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
        
    return scan
