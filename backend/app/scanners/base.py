from abc import ABC, abstractmethod
from typing import List, Dict, Any
from pydantic import BaseModel
from app.vulnerabilities.models import SeverityLevel

class ScannerResult(BaseModel):
    scanner: str
    severity: SeverityLevel
    title: str
    description: str
    evidence: str = ""
    recommendation: str = ""
    references: List[str] = []

class BaseScanner(ABC):
    def __init__(self, target_url: str):
        self.target_url = target_url

    @abstractmethod
    def run(self) -> List[ScannerResult]:
        """
        Execute the scan against the target_url and return a list of standardized ScannerResults.
        """
        pass
