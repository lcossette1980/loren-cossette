"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { FloatingContact } from "./FloatingContact";

interface Props {
  children: React.ReactNode;
  /** Server-rendered ticker passed from the root layout */
  ticker?: React.ReactNode;
}

export function ConditionalLayout({ children, ticker }: Props) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  // Don't show the ticker on the dedicated /activity page (redundant),
  // print-styled leave-behind pages, or the OVERRIDE book section
  // (separate visual brand, would clash).
  const hideTicker =
    pathname.startsWith("/activity") ||
    pathname.startsWith("/capability-statement") ||
    pathname.startsWith("/intro") ||
    pathname.startsWith("/override");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navigation />
      {ticker && !hideTicker ? ticker : null}
      <main id="main-content" tabIndex={-1} className="min-h-screen">
        <div className="site-container">{children}</div>
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
