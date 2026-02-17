export interface PersonalInfo {
  name: string;
  suffix: string;
  title: string;
  subtitle: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  social: SocialLink[];
  availableFor: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ImpactMetric {
  label: string;
  value: string;
  numericValue: number;
  suffix: string;
  prefix: string;
  sub: string;
  icon: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  tech: string[];
  stats: ProjectStat[];
  shortDescription: string;
  fullDescription: string;
  keyFeatures: string[];
  icon: string;
  featured: boolean;
  category: ProjectCategory;
  image: string;
  dashboardImage: string;
  architectureImage: string;
}

export type ProjectCategory = "ai-agents" | "nlp" | "full-stack" | "compliance";

export interface ProjectStat {
  label: string;
  value: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  summary?: string;
  highlights: ExperienceHighlight[];
  type: "primary" | "additional";
}

export interface ExperienceHighlight {
  label?: string;
  text: string;
}

export interface Education {
  degree: string;
  school: string;
  status?: string;
}

export interface Certification {
  name: string;
}

export interface Publication {
  title: string;
  venue: string;
  year: string;
}

export interface SkillRadar {
  skill: string;
  level: number;
}

export interface TechBar {
  name: string;
  val: number;
}

export interface TechCategory {
  category: string;
  items: string[];
}

export interface PersonalProject {
  slug: string;
  title: string;
  subtitle: string;
  url: string;
  tech: string[];
  description: string;
  highlights: string[];
  icon: string;
  image: string;
  category: PersonalProjectCategory;
  status: "live" | "beta" | "development";
}

export type PersonalProjectCategory = "ai-tools" | "saas" | "research" | "consulting";

export interface NavItem {
  label: string;
  href: string;
}
