import type { ViewBand } from "./mockData";

// Auto-quote: price a brief by the view band it's expected to hit, not by
// who the creator is. Base rates are per-band; longer formats cost more.
// These numbers are placeholders for a real rate card.
const baseRate: Record<ViewBand, number> = {
  "10k": 120,
  "50k": 260,
  "100k": 480,
  "250k": 1050,
  "500k": 1900,
};

export type Format = "15s" | "30s" | "60s";

const formatMultiplier: Record<Format, number> = {
  "15s": 1,
  "30s": 1.25,
  "60s": 1.6,
};

export function quoteBrief(band: ViewBand, format: Format): number {
  return Math.round((baseRate[band] * formatMultiplier[format]) / 10) * 10;
}

export function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return `${n}`;
}
