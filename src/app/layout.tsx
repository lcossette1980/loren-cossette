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
    default: "Loren Cossette | AI Automation Architect",
    template: "%s | Loren Cossette",
  },
  description:
    "I define the AI strategy, then write the code. Portfolio of Loren Cossette — AI Automation Architect, building production agentic systems, RAG pipelines, and serverless infrastructure.",
  keywords: [
    "AI Automation",
    "AI Engineer",
    "Agentic Systems",
    "RAG Pipelines",
    "NLP",
    "Deep Learning",
    "Full-Stack Developer",
    "Loren Cossette",
  ],
  authors: [{ name: "Loren Cossette" }],
  creator: "Loren Cossette",
  openGraph: {
    title: "Loren Cossette | AI Automation Architect",
    description:
      "Strategy to Production. Building production-grade agentic systems, RAG pipelines, and serverless infrastructure.",
    url: siteUrl,
    siteName: "Loren Cossette",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loren Cossette | AI Automation Architect",
    description:
      "Strategy to Production. Building production-grade agentic systems, RAG pipelines, and serverless infrastructure.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
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
