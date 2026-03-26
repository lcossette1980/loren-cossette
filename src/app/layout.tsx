import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, EB_Garamond } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";

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
      "Loren Cossette | Applied AI Strategist, Architect & Builder",
    template: "%s | Loren Cossette",
  },
  description:
    "Applied AI Strategist, Architect & Builder. I help organizations turn messy, high-stakes AI problems into working systems, operational change, and measurable outcomes.",
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
    title: "Loren Cossette | Applied AI Strategist, Architect & Builder",
    description:
      "I help organizations turn AI ideas into working systems, products, and operational change. Strategy \u2192 Architecture \u2192 Production.",
    url: siteUrl,
    siteName: "Loren Cossette",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loren Cossette | Applied AI Strategist, Architect & Builder",
    description:
      "I help organizations turn AI ideas into working systems, products, and operational change. Strategy \u2192 Architecture \u2192 Production.",
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
  jobTitle: "Applied AI Strategist, Architect & Builder",
  description:
    "Applied AI strategist and builder helping organizations turn complex AI problems into working systems and operational change.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Antonio",
    addressRegion: "TX",
    addressCountry: "US",
  },
  email: "mailto:loren.cossette@evolviqtx.com",
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
  name: "Loren Cossette — Applied AI Strategist & Builder",
  url: siteUrl,
  description:
    "Portfolio and consulting site for Loren Cossette, Applied AI Strategist, Architect & Builder.",
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
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <Analytics />
      </body>
    </html>
  );
}
