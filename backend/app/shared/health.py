from fastapi import APIRouter
from app.shared.responses import APIResponse, success_response

router = APIRouter(tags=["health"])

@router.get("/health", response_model=APIResponse[dict])
def health_check():
    return success_response(data={"status": "healthy"})

@router.get("/ready", response_model=APIResponse[dict])
def readiness_check():
    # Here we would check DB connection
    return success_response(data={"status": "ready"})

@router.get("/version", response_model=APIResponse[dict])
def version_check():
    return success_response(data={"version": "1.0.0"})
