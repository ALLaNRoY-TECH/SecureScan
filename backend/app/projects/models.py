import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.shared.base_models import Base

class Project(Base):
    __tablename__ = "projects"
    id = Column(String, primary_key=True, default=lambda: f"p_{uuid.uuid4().hex[:9]}")
    workspace_id = Column(String, ForeignKey("workspaces.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    workspace = relationship("Workspace", back_populates="projects")
    targets = relationship("Target", back_populates="project", cascade="all, delete-orphan")
    scans = relationship("ScanJob", back_populates="project")
    vulnerabilities = relationship("Vulnerability", back_populates="project")

class Target(Base):
    __tablename__ = "targets"
    id = Column(String, primary_key=True, default=lambda: f"t_{uuid.uuid4().hex[:9]}")
    project_id = Column(String, ForeignKey("projects.id"), nullable=False)
    url = Column(String, nullable=False)
    environment = Column(String, default="Production")
    tech_stack = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    project = relationship("Project", back_populates="targets")
