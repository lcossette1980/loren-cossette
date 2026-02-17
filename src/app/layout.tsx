import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
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

export const metadata: Metadata = {
  title: "Loren Cossette | AI Automation Architect",
  description:
    "I define the AI strategy, then write the code. Portfolio of Loren Cossette — AI Automation Architect, building production agentic systems, RAG pipelines, and serverless infrastructure.",
  openGraph: {
    title: "Loren Cossette | AI Automation Architect",
    description:
      "Strategy to Production. Building production-grade agentic systems, RAG pipelines, and serverless infrastructure.",
    type: "website",
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <Navigation />
        <main className="min-h-screen">
          <div className="site-container">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
