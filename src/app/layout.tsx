import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, EB_Garamond } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lorencossette.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Loren Cossette | AI Systems Architect & Automation Consultant",
    template: "%s | Loren Cossette",
  },
  description:
    "AI Systems Architect & Automation Consultant. I design and deploy production AI systems that automate operations, reduce cost, and scale decision-making for governments, enterprises, and startups.",
  keywords: [
    "AI consultant",
    "AI automation consultant",
    "AI systems architect",
    "enterprise AI architect",
    "AI implementation consultant",
    "RAG systems development",
    "agentic AI systems",
    "AI governance",
    "public sector AI",
    "enterprise GenAI",
    "AI strategy",
    "Loren Cossette",
  ],
  authors: [{ name: "Loren Cossette" }],
  creator: "Loren Cossette",
  openGraph: {
    title: "Loren Cossette | AI Systems Architect & Automation Consultant",
    description:
      "I design and deploy production AI systems that automate operations, reduce cost, and scale decision-making. AI Strategy \u2192 Architecture \u2192 Production.",
    url: siteUrl,
    siteName: "Loren Cossette",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loren Cossette | AI Systems Architect & Automation Consultant",
    description:
      "I design and deploy production AI systems that automate operations, reduce cost, and scale decision-making. AI Strategy \u2192 Architecture \u2192 Production.",
    creator: "@lorencossette",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

/* ── Schema.org JSON-LD structured data ── */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Loren Cossette",
  url: siteUrl,
  image: `${siteUrl}/images/headshot.png`,
  jobTitle: "AI Systems Architect & Automation Consultant",
  description:
    "AI Systems Architect designing and deploying production AI systems for governments, enterprises, and startups.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Antonio",
    addressRegion: "TX",
    addressCountry: "US",
  },
  email: "mailto:lorentcossette@gmail.com",
  sameAs: [
    "https://linkedin.com/in/loren-cossette",
    "https://github.com/lorentcossette",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "AI Systems Architecture",
    "Agentic AI",
    "RAG Systems",
    "AI Automation",
    "AI Governance",
    "Natural Language Processing",
    "Machine Learning",
    "Enterprise AI",
    "Public Sector AI",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "Ph.D. Leadership & Program Evaluation (In Progress)",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "M.S. Organizational Development",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "M.A. Psychology",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name: "SHRM-SCP",
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Loren Cossette — AI Systems Architect",
  url: siteUrl,
  description:
    "Portfolio and consulting site for Loren Cossette, AI Systems Architect & Automation Consultant.",
  author: { "@type": "Person", name: "Loren Cossette" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personSchema, websiteSchema]),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${ebGaramond.variable} antialiased bg-background text-foreground`}
      >
        <Navigation />
        <main className="min-h-screen">
          <div className="site-container">
            {children}
          </div>
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
