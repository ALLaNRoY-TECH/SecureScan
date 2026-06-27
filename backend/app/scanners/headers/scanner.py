import time
from typing import List
from app.scanners.base import BaseScanner, ScannerResult
from app.models.models import SeverityLevel

class HeaderScanner(BaseScanner):
    def run(self) -> List[ScannerResult]:
        # Simulate network request delay
        time.sleep(2)
        
        # Mock finding
        return [
            ScannerResult(
                scanner="HeaderScanner",
                severity=SeverityLevel.MEDIUM,
                title="Missing Content Security Policy (CSP)",
                description="The target does not enforce a Content Security Policy, making it vulnerable to Cross-Site Scripting (XSS) attacks.",
                evidence="HTTP Headers missing 'Content-Security-Policy'.",
                recommendation="Implement a strict CSP restricting script sources.",
                references=["https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP"]
            )
        ]
