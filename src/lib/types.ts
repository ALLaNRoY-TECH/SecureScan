export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
  workspaceId: string;
}

export interface Project {
  id: string;
  name: string;
  url: string;
  status: 'active' | 'archived';
  securityScore: number;
  lastScanDate: string;
  techStack: string[];
  openFindings: number;
  riskLevel: 'Critical' | 'High' | 'Medium' | 'Low';
}

export interface Vulnerability {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  cvss: number;
  status: 'Open' | 'Resolved' | 'Ignored';
  endpoint: string;
  discoveredAt: string;
}

export interface ActivityEvent {
  id: string;
  type: 'scan_completed' | 'vuln_found' | 'project_created' | 'report_generated';
  title: string;
  description: string;
  timestamp: string;
  projectId?: string;
}

export interface Recommendation {
  id: string;
  title: string;
  impact: 'High' | 'Medium' | 'Low';
  effort: 'High' | 'Medium' | 'Low';
  description: string;
}

export interface DashboardMetrics {
  overallScore: number;
  criticalVulnerabilities: number;
  highRiskFindings: number;
  protectedProjects: number;
  scansThisWeek: number;
  reportsGenerated: number;
}
