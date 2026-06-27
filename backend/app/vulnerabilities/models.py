import uuid
import enum
from datetime import datetime
from sqlalchemy import Column, String, Float, DateTime, ForeignKey, Enum, Text
from sqlalchemy.orm import relationship

from app.shared.base_models import Base

class SeverityLevel(str, enum.Enum):
    CRITICAL = "Critical"
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"
    INFO = "Info"

class Vulnerability(Base):
    __tablename__ = "vulnerabilities"
    id = Column(String, primary_key=True, default=lambda: f"v_{uuid.uuid4().hex[:9]}")
    project_id = Column(String, ForeignKey("projects.id"), nullable=False)
    scan_id = Column(String, ForeignKey("scan_jobs.id"), nullable=True)
    
    # Core Details
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    severity = Column(Enum(SeverityLevel), nullable=False)
    cvss = Column(Float, nullable=True)
    status = Column(String, default="Open")
    
    # Scan Evidence
    scanner = Column(String, nullable=True) # e.g., 'OWASP ZAP', 'Nuclei'
    endpoint = Column(String, nullable=True)
    evidence = Column(Text, nullable=True)
    remediation = Column(Text, nullable=True)
    references = Column(Text, nullable=True) # JSON or CSV string
    
    # Classification (New standard model additions)
    cwe = Column(String, nullable=True)
    owasp_category = Column(String, nullable=True)
    mitre_technique = Column(String, nullable=True)
    category = Column(String, nullable=True)
    
    discovered_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="vulnerabilities")
