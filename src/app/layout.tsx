import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, EB_Garamond } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { ShippingTicker } from "@/components/layout/ShippingTicker";

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
      "Loren Cossette | AI Program Architect",
    template: "%s | Loren Cossette",
  },
  description:
    "AI Program Architect. Embedded AI leadership for organizations undergoing modernization. Currently the AI lead for Multnomah County, running 5 production AI initiatives across accessibility, site intelligence, legacy modernization, and QA automation.",
  keywords: [
    "embedded AI lead",
    "AI program architect",
    "AI program leadership",
    "AI systems architect",
    "fractional CAIO",
    "RAG systems development",
    "agentic AI systems",
    "legacy modernization",
    "AI governance",
    "public sector AI",
    "knowledge capture",
    "behavioral testing",
    "Loren Cossette",
  ],
  authors: [{ name: "Loren Cossette" }],
  creator: "Loren Cossette",
  openGraph: {
    title: "Loren Cossette | AI Program Architect",
    description:
      "Embedded AI leadership for organizations undergoing modernization. Currently the AI lead for Multnomah County, running 5 production AI initiatives.",
    url: siteUrl,
    siteName: "Loren Cossette",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loren Cossette | AI Program Architect",
    description:
      "Embedded AI leadership for organizations undergoing modernization. 5 production AI initiatives running at Multnomah County. Shipping weekly.",
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
  jobTitle: "AI Program Architect",
  description:
    "Embedded AI program architect and lead for organizations undergoing modernization. Currently running 5 production AI initiatives at Multnomah County.",
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
  name: "Loren Cossette — AI Program Architect",
  url: siteUrl,
  description:
    "Portfolio and consulting site for Loren Cossette, AI Program Architect. Embedded AI leadership for organizations undergoing modernization.",
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
        <ConditionalLayout ticker={<ShippingTicker />}>
          {children}
        </ConditionalLayout>
        <Analytics />
      </body>
    </html>
  );
}
