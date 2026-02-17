import type { Experience } from "@/types";

export const experience: Experience[] = [
  {
    role: "AI Automation Lead (Sole Engineer)",
    company: "Multnomah County",
    period: "2025 \u2013 Present",
    location: "Portland, OR (Remote)",
    summary:
      "Own the full AI lifecycle for county government \u2014 from identifying automation opportunities through production deployment and stakeholder adoption. No team; sole technical resource responsible for strategy, architecture, code, infrastructure, and change management.",
    highlights: [
      { label: "WCAG Compliance Automation", text: "Built automated triage pipeline replacing 4,000\u201312,000 hours of manual classification ($150K\u2013$450K equivalent) with a 6-hour unattended process. Reduced 56,567-file inventory to 5,719 actionable items (90% scope reduction). Web crawl uncovered 4,265 \u201Cfalse orphans\u201D \u2014 live content invisible to the CMS." },
      { label: "Multilingual Content Platform", text: "Engineered multi-agent NLP pipeline making 20,000+ government pages translation-ready in 24 hours vs. projected 79-day manual effort \u2014 26\u00D7 faster, $34,946 saved (89% cost reduction). Four specialized PHP agents protected contact data, addresses, and 32K internal links." },
      { label: "Agentic RAG System", text: "Deployed production hub-and-spoke agent architecture (5 specialized agents) for strategic compliance management across 56K+ documents. Function-calling pipelines with Vertex AI, exponential backoff, audit logging, and human-in-the-loop approval workflows." },
      { label: "End-to-End Remediation Platform", text: "Built diagnostic + remediation data pipeline: 9-module analysis layer (readability scoring, heading validation, PII detection, PDF structure analysis) feeding six remediation agents handling vision extraction, form detection, and axe-core validation." },
      { label: "Cloud & Legacy Integration", text: "Engineered secure REST API integrations bridging Drupal 10, MySQL, and serverless microservices via Google Cloud Run and Terraform. Observability pipelines in BigQuery and Cloud Monitoring." },
    ],
    type: "primary",
  },
  {
    role: "Principal AI Engineer (Full Stack)",
    company: "EvolvIQ",
    period: "Nov 2024 \u2013 Nov 2025",
    location: "Remote",
    highlights: [
      { label: "Production AI Systems", text: "Engineered 6 production ML/AI systems \u2014 risk prediction (92%+ accuracy), churn analysis (86%+), computer vision with deep learning and neural networks (95%+), and time-series forecasting \u2014 serving enterprise clients on Azure cloud." },
      { label: "RAG & LLM Engineering", text: "Developed 3 proprietary RAG models achieving 23% response accuracy improvement over 10K queries using transformer architectures and custom prompt engineering workflows. Built AI-driven academic reading system with fine-tuned LLMs serving 500+ students." },
      { label: "Full-Stack Architecture", text: "Architected dual-agentic web platform with React frontend, FastAPI backend with REST APIs, and PCA/cosine similarity algorithms supporting 1,000+ concurrent users. Containerized deployment with Docker on Azure ML." },
    ],
    type: "primary",
  },
  {
    role: "Chief of Staff to CDAO / Strategy Director",
    company: "USAA Bank",
    period: "Jan 2023 \u2013 Nov 2024",
    location: "San Antonio, TX",
    highlights: [
      { label: "Enterprise AI Strategy", text: "Spearheaded USAA FSB\u2019s first AI & Data Strategy, embedding AI/ML and automation to accelerate digital transformation across a $126B portfolio. Delivered $2.7M business impact in Q1." },
      { label: "Decision Automation", text: "Engineered automated decision workflows cutting cycle times 64%. Designed first AI-informed Balanced Scorecard integrating predictive metrics into enterprise performance management." },
      { label: "GenAI Pilot", text: "Powered MSRgpt, a proprietary Generative AI tool enhancing customer interactions and internal decision efficiency across bank operations." },
      { label: "Workforce Transformation", text: "Led adoption impact tracking using Agile OKRs and gap analysis to evaluate AI maturity, boosting employee engagement 23% while upskilling teams on digital fluency." },
    ],
    type: "primary",
  },
  {
    role: "CEO Chief of Staff / Change Partner",
    company: "USAA",
    period: "Nov 2020 \u2013 Dec 2022",
    location: "San Antonio, TX",
    highlights: [
      { label: "CEO Operations", text: "Architected CEO strategy using McKinsey Model, reallocating time for strategic focus by 2\u00D7. Introduced 8 new processes and automated core functions, increasing efficiency 25% and slashing closure times 80%." },
      { label: "Enterprise Change Management", text: "Led change strategy impacting 3,500 employees across Consumer Lending and Complaints, increasing compliance rates from 22% to 99%. Delivered 57 change strategies aligned with Prosci methodology." },
      { label: "Executive Alignment", text: "Strengthened collaboration across 27+ leaders in 12 siloed teams, elevating trust, communication, and Board-authorized outcomes." },
    ],
    type: "primary",
  },
  {
    role: "Chief Master Sergeant (E-9)",
    company: "United States Air Force",
    period: "Oct 2001 \u2013 Aug 2020",
    location: "Multiple Locations",
    summary:
      "Promoted to E-9 in under 17 years \u2014 a milestone achieved by less than 1% of enlisted members. 20-year career spanning combat zones, training commands, and executive environments.",
    highlights: [
      { label: "Organizational Leadership", text: "Directed HR and organizational strategy for 534 personnel through COVID-19. Modernized USAF Basic Military Training, reducing attrition and saving $1.8M annually." },
      { label: "Culture & Development", text: "Founded world-class Airman Development Center. Created and scaled Air Force\u2019s #1 DE&I Program (General Welsh Award). Advised SECDEF Austin on theater-wide people strategy at USCENTCOM." },
    ],
    type: "primary",
  },
  {
    role: "AI for Leaders Program Mentor",
    company: "Great Learning x UT Austin & Johns Hopkins",
    period: "Sep 2025 \u2013 Feb 2026",
    location: "Remote",
    highlights: [
      { text: "Mentor executives in AI for Leaders (UT Austin) and AI for Enterprise (Johns Hopkins) programs. Guide senior managers through real-world AI strategy application." },
    ],
    type: "additional",
  },
  {
    role: "Corporate AI, Data & SQL Trainer",
    company: "Professional Training Resources",
    period: "Aug 2025 \u2013 Jan 2026",
    location: "Remote",
    highlights: [
      { text: "Design and deliver hands-on AI training for government and enterprise clients including U.S. Army Intelligence Center of Excellence, Department of Energy, and Walgreens University. 25\u201330 participant cohorts." },
    ],
    type: "additional",
  },
  {
    role: "AI Executive Certificate - Advisory Panel",
    company: "Houston Christian University",
    period: "Aug 2024 \u2013 Jun 2025",
    location: "Houston, TX",
    highlights: [
      { text: "Advised on AI/ML curriculum development, aligning programs with industry needs and ethical AI frameworks." },
    ],
    type: "additional",
  },
];
