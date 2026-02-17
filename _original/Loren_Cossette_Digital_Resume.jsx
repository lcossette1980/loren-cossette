import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell } from "recharts";
import { ExternalLink, Github, Linkedin, Mail, Phone, MapPin, ChevronDown, ArrowRight, Award, BookOpen, Briefcase, Code, GraduationCap, Shield, Users, Zap, Star, TrendingUp, Globe, FileText, Eye, Bot, Database, Cloud, Terminal, Brain, Layers, Activity } from "lucide-react";

// ─── Intersection Observer Hook ───
function useInView(opts = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold: 0.15, ...opts });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Animated Counter ───
function Counter({ end, suffix = "", prefix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [visible, end, duration]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ─── Reveal Animation Wrapper ───
function Reveal({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useInView();
  const transforms = { up: "translateY(40px)", down: "translateY(-40px)", left: "translateX(40px)", right: "translateX(-40px)" };
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : transforms[direction], transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s` }}>
      {children}
    </div>
  );
}

/*
  COLOR PALETTE
  Charcoal  #2A2A2A  — primary text, dark accents
  Chestnut  #A44A3F  — accent, highlights, CTA
  Khaki     #A59E8C  — secondary text, muted labels
  Pearl     #D7CEB2  — borders, subtle backgrounds
  Bone      #F5F2EA  — page background
*/
const C = {
  charcoal: "#2A2A2A",
  chestnut: "#A44A3F",
  khaki: "#A59E8C",
  pearl: "#D7CEB2",
  bone: "#F5F2EA",
  white: "#FFFFFF",
  chestnutLight: "rgba(164,74,63,0.08)",
  chestnutBorder: "rgba(164,74,63,0.18)",
  cardBg: "rgba(255,255,255,0.55)",
  cardBorder: "rgba(215,206,178,0.5)",
  textPrimary: "#2A2A2A",
  textSecondary: "#5C5A55",
  textMuted: "#A59E8C",
};

// ─── Data ───
const impactMetrics = [
  { label: "Cost Saved", value: "$2.7M+", sub: "USAA Q1 Impact", icon: TrendingUp },
  { label: "Files Automated", value: "56,567", sub: "WCAG Compliance", icon: FileText },
  { label: "Scope Reduction", value: "90%", sub: "Triage Pipeline", icon: Zap },
  { label: "Speed Increase", value: "26\u00D7", sub: "Content Platform", icon: Activity },
  { label: "Cost Reduction", value: "89%", sub: "$35K Saved", icon: Star },
  { label: "Cycle Time Cut", value: "64%", sub: "Decision Automation", icon: ArrowRight },
];

const skillsRadar = [
  { skill: "Agentic AI", level: 97 },
  { skill: "RAG Systems", level: 95 },
  { skill: "Full Stack", level: 90 },
  { skill: "MLOps", level: 88 },
  { skill: "Strategy", level: 95 },
  { skill: "NLP / LLMs", level: 96 },
  { skill: "Cloud Infra", level: 88 },
  { skill: "Change Mgmt", level: 92 },
];

const techStack = [
  { category: "AI / ML", items: ["CrewAI", "LangGraph", "Google ADK", "MCP", "Vertex AI", "PyTorch", "TensorFlow", "scikit-learn", "Gemini", "Claude", "GPT", "Mistral"] },
  { category: "Languages", items: ["Python", "PHP", "JavaScript", "SQL", "TypeScript"] },
  { category: "Full Stack", items: ["React", "FastAPI", "REST APIs", "Node.js", "Drupal 10"] },
  { category: "Cloud / DevOps", items: ["GCP", "Azure", "AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Cloud Run"] },
  { category: "Data", items: ["BigQuery", "MySQL", "Vector DBs", "Pandas", "NumPy", "ETL Pipelines"] },
];

const projects = [
  {
    title: "WCAG Compliance Engine",
    subtitle: "Automated Triage & Scope Reduction",
    tech: ["Python", "PyMySQL", "BeautifulSoup", "PDF Analysis"],
    stats: [{ label: "Files Processed", value: "56,567" }, { label: "Scope Reduction", value: "90%" }, { label: "Hours Saved", value: "12,000" }],
    description: "Six-stage automated triage pipeline replacing $150K\u2013$450K in manual classification with a 6-hour unattended process. Uncovered 4,265 \u2018false orphans\u2019 \u2014 live content invisible to the CMS.",
    color: C.chestnut,
    icon: Eye,
  },
  {
    title: "WCAG Remediation Platform",
    subtitle: "End-to-End Compliance Pipeline",
    tech: ["LangGraph", "Gemini 2.5", "Claude", "Vertex AI", "Document AI"],
    stats: [{ label: "Diagnostic Modules", value: "9" }, { label: "Remediation Agents", value: "6" }, { label: "Dept Coverage", value: "84%" }],
    description: "Production platform for WCAG 2.1 AA compliance. 9-module diagnostic layer feeding six remediation agents. Outputs accessible HTML, PDF/UA, and Drupal Webforms.",
    color: "#6B7B3A",
    icon: Shield,
  },
  {
    title: "Content Automation (Linkit)",
    subtitle: "Multilingual Translation Pipeline",
    tech: ["PHP", "Drupal 10", "Vertex AI", "Multi-Agent"],
    stats: [{ label: "Pages Processed", value: "20,000+" }, { label: "Speed", value: "26\u00D7" }, { label: "Cost Saved", value: "$34,946" }],
    description: "Four specialized PHP agents making government pages translation-ready in 24 hours vs. 79-day manual effort. Protected 32K internal links from translation corruption.",
    color: "#C17B2E",
    icon: Globe,
  },
  {
    title: "AI Commander",
    subtitle: "Agentic RAG Orchestration",
    tech: ["Python", "Vertex AI", "RAG", "Streamlit", "Multi-Agent"],
    stats: [{ label: "Specialized Agents", value: "5" }, { label: "Documents", value: "56K+" }, { label: "Architecture", value: "Hub-Spoke" }],
    description: "Production hub-and-spoke orchestration with Commander router, Data Analyst, RAG-powered WCAG Expert, Operations agent with human-in-the-loop, and Data Dictionary.",
    color: "#7B6B8A",
    icon: Bot,
  },
  {
    title: "AIRS",
    subtitle: "Academic Reading Intelligence System",
    tech: ["React", "Azure OpenAI", "FastAPI", "PyTorch"],
    stats: [{ label: "Students Served", value: "500+" }, { label: "Stack", value: "Full" }, { label: "LLM", value: "Fine-tuned" }],
    description: "Production LLM-powered academic reading coach with fine-tuning pipeline, synthetic training datasets, and real-time chat integration.",
    color: "#4A7B8A",
    icon: BookOpen,
  },
];

const experience = [
  {
    role: "AI Automation Lead (Sole Engineer)",
    company: "Multnomah County",
    period: "2025 \u2013 Present",
    location: "Portland, OR (Remote)",
    highlights: [
      "Own the full AI lifecycle for county government \u2014 strategy through production deployment",
      "Replaced $150K\u2013$450K manual labor with 6-hour automated WCAG triage pipeline",
      "Engineered multi-agent platform: 20K+ pages translation-ready in 24hrs (26\u00D7 faster)",
      "Deployed 5-agent RAG system for compliance management across 56K+ documents",
    ],
    accent: C.chestnut,
  },
  {
    role: "Principal AI Engineer (Full Stack)",
    company: "EvolvIQ",
    period: "Nov 2024 \u2013 Nov 2025",
    location: "Remote",
    highlights: [
      "Engineered 6 production ML/AI systems \u2014 risk prediction (92%+), computer vision (95%+)",
      "3 proprietary RAG models: 23% accuracy improvement over 10K queries",
      "Dual-agentic web platform supporting 1,000+ concurrent users",
    ],
    accent: "#6B7B3A",
  },
  {
    role: "Chief of Staff to CDAO / Strategy Director",
    company: "USAA Bank",
    period: "Jan 2023 \u2013 Nov 2024",
    location: "San Antonio, TX",
    highlights: [
      "Spearheaded first enterprise AI & Data Strategy across $126B portfolio",
      "Delivered $2.7M business impact in Q1; cut decision cycle times 64%",
      "Powered MSRgpt \u2014 proprietary GenAI tool across bank operations",
    ],
    accent: "#C17B2E",
  },
  {
    role: "CEO Chief of Staff / Change Partner",
    company: "USAA",
    period: "Nov 2020 \u2013 Dec 2022",
    location: "San Antonio, TX",
    highlights: [
      "CEO strategy via McKinsey Model \u2014 2\u00D7 strategic time, 80% faster closures",
      "Change strategy: 3,500 employees, compliance 22% \u2192 99%",
      "57 change strategies aligned with Prosci methodology",
    ],
    accent: "#7B6B8A",
  },
  {
    role: "Chief Master Sergeant (E-9)",
    company: "United States Air Force",
    period: "Oct 2001 \u2013 Aug 2020",
    location: "Multiple Locations",
    highlights: [
      "E-9 in under 17 years \u2014 top 1% of enlisted members",
      "Directed strategy for 534 personnel; saved $1.8M annually",
      "Founded Airman Development Center; created AF's #1 DE&I Program",
    ],
    accent: "#4A7B8A",
  },
];

const publications = [
  { title: "Bias and Reliability in AI Safety Assessment: Multi-Facet Rasch Analysis of Human Moderators", venue: "AIME", year: "2025" },
  { title: "AI Integration in Academia: Investigating the Impact on Faculty Organizational Belongingness", venue: "APA", year: "2024" },
  { title: "Self-Reflection and Socialization in Early Career Research: A LACOID-Based Text Mining Approach", venue: "AERA", year: "2024" },
  { title: "Assessing Changes in Adult Online Learners\u2019 Motivation: A Grounded Bibliometric Analysis", venue: "Book Chapter", year: "2023" },
  { title: "Exploratory Cluster Analysis of Technology Use During COVID-19 and Mental Health", venue: "J. Adolescent Health", year: "2023" },
];

const education = [
  { degree: "Ph.D. \u2014 Organizational Leadership & Program Evaluation", school: "University of the Incarnate Word", status: "In Progress" },
  { degree: "PG Certificate \u2014 AI and Machine Learning", school: "University of Texas at Austin", status: "" },
  { degree: "PG Certificate \u2014 AI/ML, LLM & GenAI", school: "Cornell University", status: "" },
  { degree: "PG Certificate \u2014 Strategic Artificial Intelligence", school: "Houston Christian University", status: "" },
  { degree: "M.S. \u2014 Organizational Development", school: "University of the Incarnate Word", status: "" },
  { degree: "M.A. \u2014 Psychology", school: "Northcentral University", status: "" },
];

// ─── Tooltips ───
const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: C.white, border: `1px solid ${C.pearl}`, borderRadius: 8, padding: "8px 14px", boxShadow: "0 4px 16px rgba(42,42,42,0.1)" }}>
        <p style={{ color: C.charcoal, fontSize: 13, margin: 0, fontWeight: 500 }}>{payload[0].payload.skill || payload[0].payload.name}</p>
        <p style={{ color: C.chestnut, fontSize: 15, fontWeight: 700, margin: 0 }}>{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const techBarData = [
  { name: "Python", val: 98 }, { name: "RAG/LLMs", val: 96 }, { name: "Agentic AI", val: 97 },
  { name: "GCP", val: 90 }, { name: "React", val: 85 }, { name: "PHP", val: 88 },
  { name: "SQL", val: 92 }, { name: "Docker", val: 87 }, { name: "Azure", val: 85 },
  { name: "FastAPI", val: 88 },
];

const barColors = ["#A44A3F","#B85A4F","#8B6B3A","#A59E8C","#6B7B3A","#7B6B8A","#4A7B8A","#C17B2E","#A44A3F","#8B6B3A"];

// ─── Main Component ───
export default function DigitalResume() {
  const [activeProject, setActiveProject] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setNavVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: C.bone, color: C.charcoal, minHeight: "90vh", fontFamily: "'Lato', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400;1,700&family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.bone}; }
        ::-webkit-scrollbar-thumb { background: ${C.pearl}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.khaki}; }

        .hero-gradient {
          background:
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(164,74,63,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 30%, rgba(165,158,140,0.08) 0%, transparent 50%),
            ${C.bone};
        }

        .card {
          background: rgba(255,255,255,0.6);
          border: 1px solid ${C.pearl};
          backdrop-filter: blur(10px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card:hover {
          background: rgba(255,255,255,0.85);
          border-color: ${C.khaki};
          box-shadow: 0 8px 32px rgba(42,42,42,0.06);
          transform: translateY(-2px);
        }

        .section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: ${C.chestnut};
          font-weight: 500;
        }

        .playfair { font-family: 'Playfair Display', serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }

        .accent-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, ${C.chestnut}40, transparent);
        }

        .divider-line {
          height: 1px;
          background: ${C.pearl};
        }

        .metric-card {
          position: relative;
          overflow: hidden;
        }
        .metric-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--accent, ${C.chestnut});
          transform: scaleX(0);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: left;
        }
        .metric-card:hover::before { transform: scaleX(1); }

        .project-card { cursor: pointer; transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .project-card.active {
          background: rgba(255,255,255,0.85) !important;
          border-color: ${C.khaki} !important;
          box-shadow: 0 4px 20px rgba(42,42,42,0.06);
        }

        .timeline-dot {
          width: 13px; height: 13px; border-radius: 50%;
          border: 2.5px solid; position: relative;
          background: ${C.bone};
        }
        .timeline-dot::after {
          content: ''; position: absolute;
          top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 5px; height: 5px; border-radius: 50%;
          background: currentColor; opacity: 0.6;
        }

        .tag {
          font-size: 11px;
          padding: 5px 12px;
          border-radius: 4px;
          background: ${C.bone};
          border: 1px solid ${C.pearl};
          font-family: 'JetBrains Mono', monospace;
          white-space: nowrap;
          color: ${C.textSecondary};
        }

        .nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          letter-spacing: 1px;
          color: ${C.khaki};
          cursor: pointer;
          transition: color 0.3s;
          text-decoration: none;
          text-transform: uppercase;
        }
        .nav-link:hover { color: ${C.chestnut}; }

        .photo-placeholder {
          width: 180px; height: 180px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(164,74,63,0.08), rgba(215,206,178,0.3));
          border: 2px solid ${C.pearl};
          display: flex; align-items: center; justify-content: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: ${C.khaki};
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .img-placeholder {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 8px;
          background: linear-gradient(135deg, ${C.bone}, rgba(215,206,178,0.4));
          border: 1px dashed ${C.pearl};
          display: flex; align-items: center; justify-content: center;
          flex-direction: column; gap: 8px;
          color: ${C.khaki};
          font-size: 12px;
          font-family: 'JetBrains Mono', monospace;
        }

        .pub-item { transition: all 0.3s; padding: 16px 20px; border-radius: 8px; }
        .pub-item:hover { background: rgba(255,255,255,0.5); }

        .btn-primary {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 28px; border-radius: 8px;
          text-decoration: none; font-size: 14px;
          font-family: 'Lato', sans-serif; font-weight: 700;
          transition: all 0.3s;
          letter-spacing: 0.5px;
        }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(164,74,63,0.15); }

        .btn-secondary {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 28px; border-radius: 8px;
          text-decoration: none; font-size: 14px;
          font-family: 'Lato', sans-serif; font-weight: 700;
          transition: all 0.3s;
          letter-spacing: 0.5px;
        }
        .btn-secondary:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(42,42,42,0.06); }

        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .float { animation: float 6s ease-in-out infinite; }
      `}</style>

      {/* ─── Floating Nav ─── */}
      <nav style={{
        position: "fixed", top: 20, left: "50%", transform: `translateX(-50%) translateY(${navVisible ? 0 : -80}px)`,
        zIndex: 100, display: "flex", gap: 24, padding: "12px 32px", borderRadius: 50,
        background: "rgba(245,242,234,0.92)", border: `1px solid ${C.pearl}`,
        backdropFilter: "blur(20px)", transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: "0 4px 24px rgba(42,42,42,0.06)",
      }}>
        {["about", "impact", "experience", "projects", "skills", "publications", "education"].map(s => (
          <span key={s} className="nav-link" onClick={() => scrollTo(s)}>{s}</span>
        ))}
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="hero-gradient" style={{ minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative", padding: "60px 24px" }}>
        {/* Subtle texture overlay */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.015, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='g' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='30' cy='30' r='0.8' fill='%232A2A2A'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3C/svg%3E")` }} />

        <Reveal>
          <div className="photo-placeholder float" style={{ marginBottom: 40 }}>Photo</div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="section-label" style={{ textAlign: "center", marginBottom: 16 }}>AI Automation Architect</p>
        </Reveal>

        <Reveal delay={0.2}>
          <h1 className="playfair" style={{ fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 700, textAlign: "center", lineHeight: 1.05, letterSpacing: "-1px", maxWidth: 800, color: C.charcoal }}>
            Loren{" "}<span style={{ fontStyle: "italic", color: C.chestnut }}>Cossette</span>
          </h1>
        </Reveal>

        <Reveal delay={0.3}>
          <p style={{ fontSize: 18, color: C.textSecondary, textAlign: "center", maxWidth: 640, marginTop: 24, lineHeight: 1.8, fontWeight: 300 }}>
            I define the AI strategy, then write the code — a rare combination that closes the gap between GenAI's potential and operational reality.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div style={{ display: "flex", gap: 20, marginTop: 28, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { icon: MapPin, text: "San Antonio, TX" },
              { icon: Mail, text: "lorentcossette@gmail.com", href: "mailto:lorentcossette@gmail.com" },
              { icon: Phone, text: "210.836.4789" },
            ].map((c, i) => (
              <a key={i} href={c.href || "#"} style={{ display: "flex", alignItems: "center", gap: 8, color: C.khaki, fontSize: 13, textDecoration: "none", fontFamily: "'JetBrains Mono', monospace" }}>
                <c.icon size={14} /> {c.text}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
            {[
              { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/loren-cossette" },
              { icon: Github, label: "GitHub", href: "https://github.com/lorentcossette" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="card" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 8, color: C.charcoal, textDecoration: "none", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
                <s.icon size={16} /> {s.label} <ExternalLink size={12} style={{ opacity: 0.35 }} />
              </a>
            ))}
          </div>
        </Reveal>

        <div style={{ position: "absolute", bottom: 40, cursor: "pointer", color: C.khaki, opacity: 0.5 }} onClick={() => scrollTo("about")}>
          <ChevronDown size={24} className="float" />
        </div>
      </section>

      {/* ─── About / Summary ─── */}
      <section id="about" style={{ padding: "64px 24px", maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <p className="section-label" style={{ marginBottom: 12 }}>About</p>
          <div className="accent-line" style={{ marginBottom: 24, maxWidth: 120 }} />
        </Reveal>

        <Reveal delay={0.1}>
          <p style={{ fontSize: 20, lineHeight: 1.9, color: C.textSecondary, fontWeight: 300 }}>
            As the <strong style={{ color: C.charcoal, fontWeight: 700 }}>sole AI automation engineer</strong> for Multnomah County, I own the full lifecycle — problem discovery, stakeholder alignment, architecture, code, deployment, and change management.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p style={{ fontSize: 20, lineHeight: 1.9, color: C.textSecondary, marginTop: 16, fontWeight: 300 }}>
            I build production agentic systems, RAG pipelines, and serverless infrastructure — while also standing up governance frameworks, training executives at <strong style={{ color: C.charcoal, fontWeight: 700 }}>UT Austin</strong> and <strong style={{ color: C.charcoal, fontWeight: 700 }}>Johns Hopkins</strong>, and publishing peer-reviewed AI research.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
            {["Ph.D. Candidate", "Prosci Certified", "SHRM-SCP", "SAFe Agilist", "20-Year Military (E-9, Top 1%)", "5 Publications"].map((t, i) => (
              <span key={i} className="tag">{t}</span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ─── Impact Metrics ─── */}
      <section id="impact" style={{ padding: "48px 24px 64px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p className="section-label" style={{ marginBottom: 12, textAlign: "center" }}>Impact</p>
            <h2 className="playfair" style={{ fontSize: "clamp(36px, 5vw, 56px)", textAlign: "center", fontWeight: 700, marginBottom: 32, color: C.charcoal }}>
              Numbers that{" "}<span style={{ fontStyle: "italic", color: C.chestnut }}>matter</span>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
            {impactMetrics.map((m, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="card metric-card" style={{ "--accent": C.chestnut, padding: "28px 20px", borderRadius: 12, textAlign: "center" }}>
                  <m.icon size={20} style={{ color: C.chestnut, marginBottom: 12, opacity: 0.6 }} />
                  <div className="mono" style={{ fontSize: 28, fontWeight: 700, color: C.charcoal, marginBottom: 4 }}>{m.value}</div>
                  <div style={{ fontSize: 13, color: C.textSecondary, marginBottom: 2, fontWeight: 500 }}>{m.label}</div>
                  <div className="mono" style={{ fontSize: 10, color: C.khaki }}>{m.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Experience Timeline ─── */}
      <section id="experience" style={{ padding: "48px 24px 64px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <p className="section-label" style={{ marginBottom: 12 }}>Experience</p>
            <h2 className="playfair" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, marginBottom: 32, color: C.charcoal }}>
              Career{" "}<span style={{ fontStyle: "italic", color: C.chestnut }}>trajectory</span>
            </h2>
          </Reveal>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 5, top: 0, bottom: 0, width: 2, background: `linear-gradient(180deg, ${C.chestnut}, ${C.pearl}, transparent)` }} />

            {experience.map((exp, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ display: "flex", gap: 32, marginBottom: 32, paddingLeft: 36, position: "relative" }}>
                  <div className="timeline-dot" style={{ color: exp.accent, borderColor: exp.accent, position: "absolute", left: -1, top: 6 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 4 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: C.charcoal }}>{exp.role}</h3>
                      <span className="mono" style={{ fontSize: 12, color: exp.accent, fontWeight: 500 }}>{exp.company}</span>
                    </div>
                    <p className="mono" style={{ fontSize: 11, color: C.khaki, marginBottom: 14 }}>
                      {exp.period} · {exp.location}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {exp.highlights.map((h, j) => (
                        <div key={j} style={{ display: "flex", gap: 10, fontSize: 14, color: C.textSecondary, lineHeight: 1.7, fontWeight: 400 }}>
                          <ArrowRight size={14} style={{ color: exp.accent, flexShrink: 0, marginTop: 4, opacity: 0.6 }} />
                          {h}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Projects Showcase ─── */}
      <section id="projects" style={{ padding: "48px 24px 64px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p className="section-label" style={{ marginBottom: 12, textAlign: "center" }}>Projects</p>
            <h2 className="playfair" style={{ fontSize: "clamp(36px, 5vw, 56px)", textAlign: "center", fontWeight: 700, marginBottom: 32, color: C.charcoal }}>
              Built &{" "}<span style={{ fontStyle: "italic", color: C.chestnut }}>shipped</span>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 24, alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {projects.map((p, i) => (
                <div key={i} onClick={() => setActiveProject(i)} className={`card project-card ${activeProject === i ? "active" : ""}`}
                  style={{ padding: "16px 20px", borderRadius: 10, borderLeft: activeProject === i ? `3px solid ${p.color}` : "3px solid transparent" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <p.icon size={18} style={{ color: p.color, opacity: 0.8 }} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: activeProject === i ? 700 : 400, color: activeProject === i ? C.charcoal : C.textSecondary }}>{p.title}</div>
                      <div className="mono" style={{ fontSize: 10, color: C.khaki }}>{p.subtitle}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{ borderRadius: 16, overflow: "hidden" }}>
              <div className="img-placeholder" style={{ borderRadius: 0, borderBottom: `1px solid ${C.pearl}` }}>
                <Code size={32} style={{ opacity: 0.3 }} />
                <span>Project Screenshot / Demo</span>
              </div>

              <div style={{ padding: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  {(() => { const Icon = projects[activeProject].icon; return <Icon size={22} style={{ color: projects[activeProject].color }} />; })()}
                  <h3 className="playfair" style={{ fontSize: 22, fontWeight: 700, color: C.charcoal }}>{projects[activeProject].title}</h3>
                </div>
                <p className="mono" style={{ fontSize: 12, color: projects[activeProject].color, marginBottom: 16, fontWeight: 500 }}>{projects[activeProject].subtitle}</p>

                <p style={{ fontSize: 14, lineHeight: 1.8, color: C.textSecondary, marginBottom: 24, fontWeight: 400 }}>
                  {projects[activeProject].description}
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
                  {projects[activeProject].stats.map((s, i) => (
                    <div key={i} style={{ background: C.bone, borderRadius: 8, padding: "14px 16px", textAlign: "center", border: `1px solid ${C.pearl}` }}>
                      <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: projects[activeProject].color }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: C.khaki, marginTop: 2, fontWeight: 500 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {projects[activeProject].tech.map((t, i) => (
                    <span key={i} className="tag">{t}</span>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                  <a href="#" className="card" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 8, color: C.charcoal, textDecoration: "none", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
                    <Github size={14} /> Repository <ExternalLink size={11} style={{ opacity: 0.35 }} />
                  </a>
                  <a href="#" className="card" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 8, color: C.charcoal, textDecoration: "none", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
                    <Eye size={14} /> Live Demo <ExternalLink size={11} style={{ opacity: 0.35 }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Skills & Tech ─── */}
      <section id="skills" style={{ padding: "48px 24px 64px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p className="section-label" style={{ marginBottom: 12, textAlign: "center" }}>Skills & Tech</p>
            <h2 className="playfair" style={{ fontSize: "clamp(36px, 5vw, 56px)", textAlign: "center", fontWeight: 700, marginBottom: 32, color: C.charcoal }}>
              The{" "}<span style={{ fontStyle: "italic", color: C.chestnut }}>stack</span>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
            <Reveal>
              <div className="card" style={{ borderRadius: 16, padding: 24 }}>
                <ResponsiveContainer width="100%" height={320}>
                  <RadarChart data={skillsRadar}>
                    <PolarGrid stroke={C.pearl} />
                    <PolarAngleAxis dataKey="skill" tick={{ fill: C.textSecondary, fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar dataKey="level" stroke={C.chestnut} fill={C.chestnut} fillOpacity={0.12} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="card" style={{ borderRadius: 16, padding: 24 }}>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={techBarData} layout="vertical" margin={{ left: 10, right: 20, top: 5, bottom: 5 }}>
                    <XAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
                    <YAxis type="category" dataKey="name" tick={{ fill: C.textSecondary, fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }} axisLine={false} tickLine={false} width={80} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="val" radius={[0, 4, 4, 0]} barSize={18}>
                      {techBarData.map((_, i) => (
                        <Cell key={i} fill={barColors[i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Reveal>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 24 }}>
            {techStack.map((cat, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="card" style={{ borderRadius: 12, padding: 20 }}>
                  <h4 className="mono" style={{ fontSize: 12, color: C.chestnut, marginBottom: 12, letterSpacing: 2, fontWeight: 500 }}>{cat.category}</h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {cat.items.map((item, j) => (
                      <span key={j} className="tag" style={{ fontSize: 10, padding: "3px 8px" }}>{item}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Publications ─── */}
      <section id="publications" style={{ padding: "48px 24px 64px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Reveal>
            <p className="section-label" style={{ marginBottom: 12 }}>Publications</p>
            <h2 className="playfair" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, marginBottom: 28, color: C.charcoal }}>
              Peer-reviewed{" "}<span style={{ fontStyle: "italic", color: C.chestnut }}>research</span>
            </h2>
          </Reveal>

          {publications.map((pub, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="pub-item" style={{ display: "flex", gap: 20, alignItems: "flex-start", marginBottom: 8 }}>
                <span className="mono" style={{ fontSize: 13, color: C.chestnut, opacity: 0.7, flexShrink: 0, marginTop: 2, fontWeight: 500 }}>{pub.year}</span>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: C.charcoal, lineHeight: 1.6 }}>{pub.title}</p>
                  <p className="mono" style={{ fontSize: 11, color: C.khaki, marginTop: 4 }}>{pub.venue}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── Education ─── */}
      <section id="education" style={{ padding: "48px 24px 64px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Reveal>
            <p className="section-label" style={{ marginBottom: 12 }}>Education</p>
            <h2 className="playfair" style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, marginBottom: 28, color: C.charcoal }}>
              Academic{" "}<span style={{ fontStyle: "italic", color: C.chestnut }}>foundation</span>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gap: 12 }}>
            {education.map((ed, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="card" style={{ padding: "18px 24px", borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: C.charcoal }}>{ed.degree}</p>
                    <p className="mono" style={{ fontSize: 11, color: C.khaki, marginTop: 3 }}>{ed.school}</p>
                  </div>
                  {ed.status && <span className="tag" style={{ borderColor: C.chestnutBorder, color: C.chestnut, background: C.chestnutLight }}>{ed.status}</span>}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4}>
            <div style={{ marginTop: 28 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: C.khaki, marginBottom: 16 }}>Certifications</h3>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["SHRM-SCP", "Prosci Change Management", "SAFe 5.0 Agilist", "EQi-2.0 Practitioner"].map((c, i) => (
                  <span key={i} className="card" style={{ padding: "10px 18px", borderRadius: 8, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, color: C.charcoal }}>
                    <Award size={14} style={{ color: C.chestnut }} /> {c}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Footer CTA ─── */}
      <section style={{ padding: "48px 24px 64px", textAlign: "center" }}>
        <Reveal>
          <div className="accent-line" style={{ maxWidth: 200, margin: "0 auto 28px" }} />
          <h2 className="playfair" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, marginBottom: 20, color: C.charcoal }}>
            Let's build something{" "}<span style={{ fontStyle: "italic", color: C.chestnut }}>extraordinary</span>
          </h2>
          <p style={{ fontSize: 16, color: C.khaki, maxWidth: 500, margin: "0 auto 32px", fontWeight: 400 }}>
            Open to senior AI engineering, principal architect, and strategic AI leadership roles.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:lorentcossette@gmail.com" className="btn-primary" style={{ background: C.chestnut, color: C.bone, border: "none" }}>
              <Mail size={16} /> Get in Touch
            </a>
            <a href="https://linkedin.com/in/loren-cossette" target="_blank" rel="noopener noreferrer" className="btn-secondary card" style={{ color: C.charcoal }}>
              <Linkedin size={16} /> Connect on LinkedIn <ExternalLink size={12} style={{ opacity: 0.35 }} />
            </a>
          </div>
        </Reveal>

        <p className="mono" style={{ fontSize: 10, color: C.pearl, marginTop: 48, letterSpacing: 2 }}>
          DESIGNED & ENGINEERED BY LOREN COSSETTE · 2025
        </p>
      </section>
    </div>
  );
}
