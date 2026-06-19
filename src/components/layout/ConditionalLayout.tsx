"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { FloatingContact } from "./FloatingContact";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content" tabIndex={-1} className="min-h-screen">
        <div className="site-container">{children}</div>
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
