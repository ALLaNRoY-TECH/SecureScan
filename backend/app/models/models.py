import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, ForeignKey, Enum, Text
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import enum

from app.shared.base_models import Base

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    USER = "user"

class ScanStatus(str, enum.Enum):
    PENDING = "Pending"
    RUNNING = "Running"
    COMPLETED = "Completed"
    FAILED = "Failed"

class SeverityLevel(str, enum.Enum):
    CRITICAL = "Critical"
    HIGH = "High"
    MEDIUM = "Medium"
    LOW = "Low"
    INFO = "Info"

class Workspace(Base):
    __tablename__ = "workspaces"
    id = Column(String, primary_key=True, default=lambda: f"w_{uuid.uuid4().hex[:9]}")
    name = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    users = relationship("User", back_populates="workspace")
    projects = relationship("Project", back_populates="workspace")

class User(Base):
    __tablename__ = "users"
    # In Supabase, this ID will often map to auth.users.id (which is a UUID), but we use String for flexibility
    id = Column(String, primary_key=True) 
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    avatar = Column(String, nullable=True)
    role = Column(Enum(UserRole), default=UserRole.USER)
    workspace_id = Column(String, ForeignKey("workspaces.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    workspace = relationship("Workspace", back_populates="users")





class Vulnerability(Base):
    __tablename__ = "vulnerabilities"
    id = Column(String, primary_key=True, default=lambda: f"v_{uuid.uuid4().hex[:9]}")
    project_id = Column(String, ForeignKey("projects.id"), nullable=False)
    scan_id = Column(String, ForeignKey("scan_jobs.id"), nullable=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    severity = Column(Enum(SeverityLevel), nullable=False)
    cvss = Column(Float, nullable=True)
    status = Column(String, default="Open")
    endpoint = Column(String, nullable=True)
    evidence = Column(Text, nullable=True)
    remediation = Column(Text, nullable=True)
    discovered_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="vulnerabilities")
