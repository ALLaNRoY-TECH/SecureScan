from typing import List
from sqlalchemy.orm import Session
from datetime import datetime

from app.scans.models import ScanJob, ScanStatus
from app.models.models import Vulnerability
from app.scanners.headers.scanner import HeaderScanner
from app.scanners.ssl.scanner import SSLScanner
from app.scanners.ports.scanner import PortScanner

def run_orchestrator(scan_id: str, db: Session):
    scan = db.query(ScanJob).filter(ScanJob.id == scan_id).first()
    if not scan:
        return
    
    scan.status = ScanStatus.RUNNING
    scan.started_at = datetime.utcnow()
    db.commit()

    target_url = scan.target_url

    plugins = [
        HeaderScanner(target_url),
        SSLScanner(target_url),
        PortScanner(target_url)
    ]

    all_results = []
    try:
        for plugin in plugins:
            results = plugin.run()
            all_results.extend(results)
        
        for res in all_results:
            vuln = Vulnerability(
                project_id=scan.project_id,
                scan_id=scan.id,
                title=res.title,
                description=res.description,
                severity=res.severity,
                endpoint=target_url,
                evidence=res.evidence,
                remediation=res.recommendation
            )
            db.add(vuln)
        
        scan.status = ScanStatus.COMPLETED
    except Exception as e:
        scan.status = ScanStatus.FAILED
    finally:
        scan.completed_at = datetime.utcnow()
        db.commit()
