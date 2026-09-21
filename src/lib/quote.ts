import type { Rights, ViewBand } from "./mockData";

// Auto-quote: price a brief by the view band it's expected to hit, the
// format, and the usage rights the brand needs — never by who the creator
// is. These numbers are placeholders for a real rate card.
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

// Paid usage rights are what turn a post into ad creative. They cost more
// because the brand gets to amplify it on its own ad account.
const rightsMultiplier: Record<Rights, number> = {
  organic: 1,
  paid_90: 1.4,
  paid_365: 1.9,
};

export function quoteBrief(band: ViewBand, format: Format, rights: Rights = "organic"): number {
  return Math.round((baseRate[band] * formatMultiplier[format] * rightsMultiplier[rights]) / 10) * 10;
}

export function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return `${n}`;
}

export function money(n: number, decimals = 0): string {
  return `$${n.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
}

// Effective CPM = cost per thousand views. The number a CMO compares to paid.
export function cpm(spend: number, views: number): number {
  return views === 0 ? 0 : (spend / views) * 1000;
}
