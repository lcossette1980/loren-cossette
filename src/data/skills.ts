import type { SkillRadar, TechBar, TechCategory } from "@/types";

export const skillsRadar: SkillRadar[] = [
  { skill: "Agentic AI", level: 97 },
  { skill: "RAG Systems", level: 95 },
  { skill: "Full Stack", level: 90 },
  { skill: "MLOps", level: 88 },
  { skill: "Strategy", level: 95 },
  { skill: "NLP / LLMs", level: 96 },
  { skill: "Cloud Infra", level: 88 },
  { skill: "Change Mgmt", level: 92 },
];

export const techBarData: TechBar[] = [
  { name: "Python", val: 98 },
  { name: "RAG/LLMs", val: 96 },
  { name: "Agentic AI", val: 97 },
  { name: "GCP", val: 90 },
  { name: "React", val: 85 },
  { name: "PHP", val: 88 },
  { name: "SQL", val: 92 },
  { name: "Docker", val: 87 },
  { name: "Azure", val: 85 },
  { name: "FastAPI", val: 88 },
];

export const techStack: TechCategory[] = [
  {
    category: "AI / ML",
    items: [
      "CrewAI", "LangGraph", "Google ADK", "MCP", "Vertex AI",
      "PyTorch", "TensorFlow", "scikit-learn", "Gemini", "Claude",
      "GPT", "Mistral",
    ],
  },
  {
    category: "Languages",
    items: ["Python", "PHP", "JavaScript", "SQL", "TypeScript"],
  },
  {
    category: "Full Stack",
    items: ["React", "FastAPI", "REST APIs", "Node.js", "Drupal 10"],
  },
  {
    category: "Cloud / DevOps",
    items: [
      "GCP", "Azure", "AWS", "Docker", "Kubernetes",
      "Terraform", "CI/CD", "Cloud Run",
    ],
  },
  {
    category: "Data",
    items: [
      "BigQuery", "MySQL", "Vector DBs", "Pandas", "NumPy",
      "ETL Pipelines",
    ],
  },
];

export const coreCompetencies = [
  {
    category: "AI Engineering",
    items: [
      "Agentic Systems (CrewAI, LangGraph, Google ADK, MCP)",
      "RAG & Vector Search",
      "LLM Deployment (Gemini, Claude, GPT, Mistral)",
      "NLP", "Deep Learning", "Prompt Engineering", "MLOps",
      "Fine-Tuning", "Model Evaluation & A/B Testing",
      "Vertex AI", "PyTorch", "TensorFlow", "scikit-learn",
    ],
  },
  {
    category: "Full Stack & Data Engineering",
    items: [
      "Python", "Pandas", "NumPy", "PHP", "React", "FastAPI",
      "REST APIs", "SQL", "NoSQL", "JavaScript", "GCP", "Azure",
      "AWS", "Docker", "Kubernetes", "Terraform", "CI/CD",
      "Data Pipelines", "ETL", "Feature Engineering",
    ],
  },
  {
    category: "Strategy & Leadership",
    items: [
      "Enterprise AI Strategy", "ROI Quantification",
      "Executive Alignment", "Governance & Compliance",
      "Change Management", "Workforce Transformation",
      "Agile & Scrum", "SAFe",
    ],
  },
];
