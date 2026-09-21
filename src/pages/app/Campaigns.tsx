import { Link } from "react-router-dom";
import clsx from "clsx";
import { campaigns, briefs, performance as perf, paidBenchmark, statusLabel } from "../../lib/mockData";
import { cpm, formatCompact, money } from "../../lib/quote";
import { StatusDot } from "../../components/StatusDot";

// Roll every brief and post up to the campaign it belongs to.
export function campaignStats(campaignId: string) {
  const cBriefs = briefs.filter((b) => b.campaignId === campaignId);
  const briefIds = new Set(cBriefs.map((b) => b.id));
  const posts = perf.filter((p) => briefIds.has(p.briefId));
  const committed = cBriefs.reduce((s, b) => s + b.payout, 0);
  const boostSpend = posts.reduce((s, p) => s + (p.boosted?.spend ?? 0), 0);
  const views = posts.reduce((s, p) => s + p.views + (p.boosted?.views ?? 0), 0);
  const clicks = posts.reduce((s, p) => s + p.clicks + (p.boosted?.clicks ?? 0), 0);
  const conversions = posts.reduce((s, p) => s + p.conversions, 0);
  const spent = committed + boostSpend;
  return { briefs: cBriefs, posts, committed, boostSpend, spent, views, clicks, conversions, cpm: cpm(spent, views) };
}

export function Campaigns() {
  const live = campaigns.filter((c) => c.status !== "done");
  const totals = live.reduce(
    (acc, c) => {
      const s = campaignStats(c.id);
      return { budget: acc.budget + c.budget, spent: acc.spent + s.spent, views: acc.views + s.views, conversions: acc.conversions + s.conversions };
    },
    { budget: 0, spent: 0, views: 0, conversions: 0 }
  );
  const blendedCpm = cpm(totals.spent, totals.views);

  return (
    <div className="px-5 py-8 sm:px-8 sm:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Campaigns</h1>
          <p className="mt-1 text-sm text-mist">Budget, reach, and cost — per campaign.</p>
        </div>
        <Link to="/app/board" className="rounded-full bg-signal px-4 py-2.5 text-sm font-medium text-white hover:bg-signal/90">
          Post a brief
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-4">
        <Stat label="Budget in play" value={money(totals.budget)} />
        <Stat label="Spent so far" value={money(totals.spent)} sub={`${Math.round((totals.spent / totals.budget) * 100)}% of budget`} />
        <Stat label="Views delivered" value={formatCompact(totals.views)} />
        <Stat
          label="Your CPM"
          value={money(blendedCpm, 2)}
          sub={`Paid social: ${money(paidBenchmark.cpm, 2)}`}
          tone={blendedCpm < paidBenchmark.cpm ? "good" : undefined}
        />
      </div>

      <ul className="mt-8 space-y-4">
        {campaigns.map((c) => {
          const s = campaignStats(c.id);
          const spentPct = Math.min(100, Math.round((s.spent / c.budget) * 100));
          const viewPct = Math.min(100, Math.round((s.views / c.targetViews) * 100));
          return (
            <li key={c.id} className="rounded-2xl border border-charcoal/[0.06] bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">{c.name}</h2>
                    <span
                      className={clsx(
                        "rounded-full px-2 py-0.5 text-[11px] font-medium",
                        c.status === "live" ? "bg-aurora-dim text-aurora" : "bg-paper-dim text-mist"
                      )}
                    >
                      {c.status === "live" ? "Live" : c.status === "done" ? "Finished" : "Planning"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-mist">{c.goal}</p>
                </div>
                <div className="text-right text-xs text-mist">
                  {c.startDate} → {c.endDate}
                </div>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Pacing label="Budget" left={money(s.spent)} right={money(c.budget)} pct={spentPct} />
                <Pacing label="Views vs target" left={formatCompact(s.views)} right={formatCompact(c.targetViews)} pct={viewPct} accent />
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <Kpi label="CPM" value={s.views ? money(s.cpm, 2) : "—"} good={s.views > 0 && s.cpm < paidBenchmark.cpm} />
                <Kpi label="Clicks" value={s.clicks ? formatCompact(s.clicks) : "—"} />
                <Kpi label="Conversions" value={s.conversions ? String(s.conversions) : "—"} />
                <Kpi label="Boosted" value={s.boostSpend ? money(s.boostSpend) : "—"} />
                <div className="ml-auto flex flex-wrap gap-2">
                  {s.briefs.map((b) => (
                    <Link
                      key={b.id}
                      to={`/app/review?brief=${b.id}`}
                      className="flex items-center gap-1.5 rounded-full border border-charcoal/10 px-2.5 py-1 text-xs text-mist hover:border-charcoal/30 hover:text-charcoal"
                      title={statusLabel[b.status]}
                    >
                      <StatusDot status={b.status} />
                      {b.thumbnail} {b.creator.split(" ")[0]}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Stat({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "good" }) {
  return (
    <div className="rounded-2xl border border-charcoal/[0.06] bg-white p-5">
      <div className="text-xs text-mist">{label}</div>
      <div className={clsx("mt-2 text-2xl font-semibold", tone === "good" && "text-aurora")}>{value}</div>
      {sub && <div className="mt-1 text-xs text-mist">{sub}</div>}
    </div>
  );
}

function Pacing({ label, left, right, pct, accent }: { label: string; left: string; right: string; pct: number; accent?: boolean }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs text-mist">
        <span>{label}</span>
        <span>
          <span className="font-medium text-charcoal">{left}</span> / {right}
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-paper-dim">
        <div className={clsx("h-full rounded-full", accent ? "bg-signal" : "bg-charcoal")} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Kpi({ label, value, good }: { label: string; value: string; good?: boolean }) {
  return (
    <div>
      <span className="text-xs text-mist">{label} </span>
      <span className={clsx("font-medium", good && "text-aurora")}>{value}</span>
    </div>
  );
}
