"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";

interface AdminShellProps {
  children: ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border-default bg-bg-secondary">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/admin/blog"
              className="text-sm font-mono font-bold text-accent-cyan tracking-wider"
            >
              LC Admin
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/admin/blog"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                Blog Posts
              </Link>
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="text-sm text-text-muted hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
