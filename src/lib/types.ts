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
}
