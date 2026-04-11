export type ProjectCategory = "pro" | "perso" | "lab";
export type ProjectVisibility = "public" | "private";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  gallery?: string[];
  category: ProjectCategory;
  featured: boolean;
  visibility: ProjectVisibility;
  technologies: string[];
  context?: string;
  solution?: string;
  highlights?: string[];
  metrics?: ProjectMetric[];
  githubUrl?: string;
  liveUrl?: string;
  demoVideoUrl?: string;
  docsUrl?: string;
}

export interface Experience {
  _id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export type SkillCategory = "frontend" | "backend" | "devops" | "tools";

export interface Skill {
  _id: string;
  name: string;
  category: SkillCategory;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  icon?: string;
}
