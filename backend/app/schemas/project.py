from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from datetime import datetime

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class TargetBase(BaseModel):
    url: HttpUrl
    environment: str = "Production"
    tech_stack: Optional[str] = None

class TargetCreate(TargetBase):
    pass

class TargetResponse(TargetBase):
    id: str
    project_id: str
    created_at: datetime

    class Config:
        from_attributes = True

class ProjectResponse(ProjectBase):
    id: str
    workspace_id: str
    created_at: datetime
    targets: List[TargetResponse] = []

    class Config:
        from_attributes = True
