import Link from "next/link";
import { getActivity, type ActivityEntry } from "@/data/activity";

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(iso: string): string {
  const parts = iso.split("-").map((v) => parseInt(v, 10));
  const m = parts[1];
  const d = parts[2];
  if (!m || !d) return iso;
  return `${MONTH_LABELS[m - 1]} ${d}`;
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  // Trim to last word boundary before max for a cleaner cut
  const slice = text.slice(0, max);
  const lastSpace = slice.lastIndexOf(" ");
  const safe = lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice;
  return safe.trimEnd() + "…";
}

function TickerItem({ entry }: { entry: ActivityEntry }) {
  const content = (
    <span className="flex items-center gap-3 whitespace-nowrap shrink-0">
      <span className="font-mono text-[10px] tracking-widest uppercase text-text-muted">
        {formatDate(entry.date)}
      </span>
      <span className="font-mono text-[10px] tracking-widest uppercase text-accent-warm/80">
        {entry.project}
      </span>
      <span className="text-[12px] text-text-secondary">
        {truncate(entry.summary, 90)}
      </span>
    </span>
  );

  if (!entry.href) return content;

  const isExternal = entry.href.startsWith("http");
  if (isExternal) {
    return (
      <a
        href={entry.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:text-text-primary transition-colors"
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={entry.href} className="block hover:text-text-primary transition-colors">
      {content}
    </Link>
  );
}

export async function ShippingTicker() {
  const all = await getActivity();
  const items = all.slice(0, 10);
  if (items.length === 0) return null;

  // Duplicate items so the marquee loops seamlessly. translateX(-50%)
  // lands the start of the second copy exactly where the first started.
  const doubled = [...items, ...items];

  return (
    <div
      role="region"
      aria-label="Recent shipping activity"
      className="ticker-container fixed top-16 left-0 right-0 z-40 border-b border-border-default bg-[rgba(10,10,15,0.92)] backdrop-blur-xl overflow-hidden"
    >
      <div className="flex items-stretch">
        {/* Live indicator — fixed left, doesn't scroll */}
        <div className="flex items-center gap-2 px-4 py-2.5 shrink-0 border-r border-border-default bg-bg-tertiary/60 z-10">
          <span
            className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"
            aria-hidden="true"
          />
          <span className="font-mono text-[10px] tracking-[2px] uppercase text-accent-cyan font-semibold">
            Shipping
          </span>
        </div>

        {/* Scrolling track */}
        <div className="relative flex-1 overflow-hidden">
          <div
            className="ticker-track flex items-center gap-10 py-2.5 px-6 will-change-transform"
            aria-live="off"
          >
            {doubled.map((entry, i) => (
              <TickerItem key={`${entry.date}-${entry.project}-${i}`} entry={entry} />
            ))}
          </div>
          {/* Fade edges so items appear/disappear softly */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-bg-elevated/95 to-transparent pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-bg-elevated/95 to-transparent pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
