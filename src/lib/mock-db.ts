import { User, Project } from "./types";

export const mockDb = {
  currentUser: {
    id: "u_1",
    name: "Alex Jensen",
    email: "alex@example.com",
    avatar: "AJ",
    role: "admin",
    workspaceId: "w_1"
  } as User,
  projects: [
    { id: "p_1", name: "Production API", url: "https://api.example.com", status: "active", securityScore: 84, lastScanDate: new Date().toISOString(), techStack: ["Node.js", "Express", "PostgreSQL"] },
    { id: "p_2", name: "Auth Service", url: "https://auth.example.com", status: "active", securityScore: 92, lastScanDate: new Date().toISOString(), techStack: ["Go", "Redis"] },
    { id: "p_3", name: "Legacy Frontend", url: "https://legacy.example.com", status: "active", securityScore: 45, lastScanDate: new Date().toISOString(), techStack: ["React 16", "Webpack"] }
  ] as Project[],
};

// Simulate network latency
export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
