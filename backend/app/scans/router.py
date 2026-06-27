from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session

from app.shared.database import get_db
from app.api.deps import get_current_user
from app.models.models import User
from app.scans.schemas import ScanCreate, ScanResponse
from app.scans.service import ScanService
from app.shared.responses import APIResponse, success_response

router = APIRouter(tags=["scans"])

def get_scan_service(db: Session = Depends(get_db)) -> ScanService:
    return ScanService(db)

@router.post("/launch", response_model=APIResponse[ScanResponse])
def launch_scan(
    scan_in: ScanCreate,
    background_tasks: BackgroundTasks,
    service: ScanService = Depends(get_scan_service),
    current_user: User = Depends(get_current_user)
):
    try:
        scan = service.launch_scan(scan_in, current_user.workspace_id, background_tasks)
        return success_response(data=scan)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/{scan_id}", response_model=APIResponse[ScanResponse])
def get_scan_status(
    scan_id: str,
    service: ScanService = Depends(get_scan_service),
    current_user: User = Depends(get_current_user)
):
    try:
        scan = service.get_scan(scan_id, current_user.workspace_id)
        return success_response(data=scan)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
