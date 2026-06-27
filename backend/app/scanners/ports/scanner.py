import time
from typing import List
from app.scanners.base import BaseScanner, ScannerResult
from app.vulnerabilities.models import SeverityLevel

class PortScanner(BaseScanner):
    def run(self) -> List[ScannerResult]:
        time.sleep(4)
        return [
            ScannerResult(
                scanner="PortScanner",
                severity=SeverityLevel.CRITICAL,
                title="Exposed Database Port",
                description="Port 5432 (PostgreSQL) is open to the public internet.",
                evidence="Nmap scan revealed port 5432/tcp state: open",
                recommendation="Restrict database access to internal IP addresses or a VPN.",
                references=["https://cwe.mitre.org/data/definitions/284.html"]
            )
        ]
