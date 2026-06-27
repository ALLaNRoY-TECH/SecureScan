import uuid
import enum
from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship

from app.shared.base_models import Base

class ScanStatus(str, enum.Enum):
    PENDING = "Pending"
    RUNNING = "Running"
    COMPLETED = "Completed"
    FAILED = "Failed"

class ScanJob(Base):
    __tablename__ = "scan_jobs"
    id = Column(String, primary_key=True, default=lambda: f"s_{uuid.uuid4().hex[:9]}")
    project_id = Column(String, ForeignKey("projects.id"), nullable=False)
    target_url = Column(String, nullable=False)
    status = Column(Enum(ScanStatus), default=ScanStatus.PENDING)
    scan_type = Column(String, default="Quick Scan")
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    
    project = relationship("Project", back_populates="scans")
