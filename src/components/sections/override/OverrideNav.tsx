"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { overrideNavItems, bookInfo } from "@/data/override";

export function OverrideNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-[rgba(196,153,59,0.15)] bg-[#1A1A1A]/95 backdrop-blur-xl">
      <div className="site-container flex items-center justify-between h-12">
        <div className="flex items-center gap-1">
          {overrideNavItems.map((item) => {
            const isActive = item.href === "/override"
              ? pathname === "/override"
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 font-sans text-[11px] tracking-[1px] uppercase transition-colors duration-300",
                  isActive
                    ? "text-[#C4993B]"
                    : "text-[#999] hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <Link
          href={bookInfo.buyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center px-4 py-1.5 bg-[#C4993B] text-[#1A1A1A] text-xs font-bold tracking-wide rounded hover:bg-[#d4a940] transition-colors"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
}
