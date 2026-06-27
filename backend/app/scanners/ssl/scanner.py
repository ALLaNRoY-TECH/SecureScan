import time
from typing import List
from app.scanners.base import BaseScanner, ScannerResult
from app.models.models import SeverityLevel

class SSLScanner(BaseScanner):
    def run(self) -> List[ScannerResult]:
        time.sleep(3)
        return [
            ScannerResult(
                scanner="SSLScanner",
                severity=SeverityLevel.LOW,
                title="TLS 1.2 Deprecation Warning",
                description="The server supports TLS 1.2. While currently secure, industry standards are moving towards TLS 1.3 exclusively.",
                evidence="Protocol supported: TLSv1.2",
                recommendation="Ensure TLS 1.3 is enabled and prepare to phase out TLS 1.2 in the future.",
                references=["https://datatracker.ietf.org/doc/html/rfc8446"]
            )
        ]
