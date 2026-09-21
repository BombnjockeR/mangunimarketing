import { useState } from "react";
import clsx from "clsx";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { performance as initialPerf, briefs, paidBenchmark, hookTests, type PostPerformance } from "../../lib/mockData";
import { cpm, formatCompact, money } from "../../lib/quote";
import { Icon } from "../../components/Icons";

function briefOf(p: PostPerformance) {
  return briefs.find((b) => b.id === p.briefId);
}

export function Analytics() {
  const [posts, setPosts] = useState<PostPerformance[]>(initialPerf);
  const [activeId, setActiveId] = useState(posts[0].id);
  const [toast, setToast] = useState<string | null>(null);
  const post = posts.find((p) => p.id === activeId)!;
  const brief = briefOf(post);

  // Totals across every live post
  const totals = posts.reduce(
    (a, p) => {
      const b = briefOf(p);
      return {
        spend: a.spend + (b?.payout ?? 0) + (p.boosted?.spend ?? 0),
        views: a.views + p.views + (p.boosted?.views ?? 0),
        clicks: a.clicks + p.clicks + (p.boosted?.clicks ?? 0),
        conversions: a.conversions + p.conversions,
      };
    },
    { spend: 0, views: 0, clicks: 0, conversions: 0 }
  );
  const ourCpm = cpm(totals.spend, totals.views);
  const ourCpc = totals.clicks ? totals.spend / totals.clicks : 0;
  const savings = Math.max(0, (paidBenchmark.cpm - ourCpm) * (totals.views / 1000));

  const postSpend = (brief?.payout ?? 0) + (post.boosted?.spend ?? 0);
  const postViews = post.views + (post.boosted?.views ?? 0);

  function boost(id: string) {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, boosted: { spend: 500, views: Math.round(p.views * 0.9), clicks: Math.round(p.clicks * 0.8) } } : p))
    );
    setToast("Boost started — $500 behind this post as a Spark Ad. Results update here.");
    setTimeout(() => setToast(null), 3500);
  }

  function exportCsv() {
    const rows = [
      ["Brief", "Creator", "Platform", "Views", "Clicks", "Conversions", "Spend", "CPM"],
      ...posts.map((p) => {
        const b = briefOf(p);
        const spend = (b?.payout ?? 0) + (p.boosted?.spend ?? 0);
        const views = p.views + (p.boosted?.views ?? 0);
        return [b?.title ?? "", b?.creator ?? "", p.platform, views, p.clicks + (p.boosted?.clicks ?? 0), p.conversions, spend, cpm(spend, views).toFixed(2)];
      }),
    ];
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "manguni-results.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="px-5 py-8 sm:px-8 sm:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Results</h1>
          <p className="mt-1 text-sm text-mist">What you paid, what you got, and how it compares to paid ads.</p>
        </div>
        <button onClick={exportCsv} className="rounded-full border border-charcoal/15 bg-white px-4 py-2 text-sm font-medium hover:border-charcoal/30">
          Export CSV
        </button>
      </div>

      {/* The CMO row: money in, reach out, vs paid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Spend" value={money(totals.spend)} sub="creator fees + boosts" />
        <Stat label="Views" value={formatCompact(totals.views)} sub={`${formatCompact(totals.clicks)} clicks · ${totals.conversions} conversions`} />
        <Stat
          label="Your CPM"
          value={money(ourCpm, 2)}
          sub={`Paid social ${money(paidBenchmark.cpm, 2)} · CPC ${money(ourCpc, 2)} vs ${money(paidBenchmark.cpc, 2)}`}
          good={ourCpm < paidBenchmark.cpm}
        />
        <Stat label="Saved vs paid" value={money(savings)} sub="same views bought as ads" good />
      </div>

      {/* Hook test — the testing loop, made visible */}
      {hookTests.map((t) => {
        const winner = [...t.variants].sort((a, b) => b.views - a.views)[0];
        return (
          <div key={t.id} className="mt-8 rounded-2xl border border-charcoal/[0.06] bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-semibold">Hook test · {t.briefTitle}</h2>
              <span className="text-xs text-mist">Same brief, three openings. Scale the winner.</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {t.variants.map((v) => {
                const isWinner = v.label === winner.label;
                return (
                  <div key={v.label} className={clsx("rounded-xl border p-4", isWinner ? "border-signal bg-signal-soft" : "border-charcoal/[0.08]")}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-mist">Hook {v.label}</span>
                      {isWinner && <span className="rounded-full bg-signal px-2 py-0.5 text-[11px] font-medium text-white">Winner</span>}
                    </div>
                    <p className="mt-2 text-sm">{v.hook}</p>
                    <div className="mt-3 flex gap-4 text-xs text-mist">
                      <span>
                        <span className="font-semibold text-charcoal">{formatCompact(v.views)}</span> views
                      </span>
                      <span>{v.retention}% watched</span>
                      <span>{formatCompact(v.clicks)} clicks</span>
                    </div>
                    {isWinner && (
                      <button
                        onClick={() => {
                          setToast("Boost started — $500 behind Hook B. Results update here.");
                          setTimeout(() => setToast(null), 3500);
                        }}
                        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-charcoal px-3 py-1.5 text-xs font-medium text-white hover:bg-charcoal/90"
                      >
                        <Icon.bolt className="h-3.5 w-3.5" /> Boost as ad
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Per-post detail */}
      <div className="mt-8 flex flex-wrap gap-2">
        {posts.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveId(p.id)}
            className={clsx(
              "rounded-full border px-3 py-1.5 text-xs",
              activeId === p.id ? "border-signal bg-signal-soft text-charcoal" : "border-charcoal/15 text-mist hover:border-charcoal/30"
            )}
          >
            {briefOf(p)?.title}
            {p.boosted && <span className="ml-1.5 text-signal">· boosted</span>}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl border border-charcoal/[0.06] bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-xs text-mist">
                {brief?.title} · {brief?.creator}
              </div>
              <div className="mt-1 text-3xl font-semibold">{postViews.toLocaleString()} views</div>
              <div className="mt-1 text-sm text-mist">
                {money(postSpend)} spent · CPM {money(cpm(postSpend, postViews), 2)}
                {post.boosted && <span className="text-signal"> · includes {money(post.boosted.spend)} boost</span>}
              </div>
            </div>
            {brief && brief.rights !== "organic" && !post.boosted ? (
              <button
                onClick={() => boost(post.id)}
                className="inline-flex items-center gap-1.5 rounded-full bg-charcoal px-4 py-2 text-sm font-medium text-white hover:bg-charcoal/90"
              >
                <Icon.bolt className="h-4 w-4" /> Boost as ad
              </button>
            ) : brief && brief.rights === "organic" ? (
              <span className="rounded-full bg-paper-dim px-3 py-1.5 text-xs text-mist" title="This brief was bought with organic-only rights">
                No paid rights
              </span>
            ) : null}
          </div>
          <div className="mt-6 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={post.history} margin={{ left: 0, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6d4aff" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6d4aff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#0f10201a" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#6b7080" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={formatCompact} tick={{ fontSize: 11, fill: "#6b7080" }} axisLine={false} tickLine={false} width={40} />
                <Tooltip formatter={(v) => Number(v).toLocaleString()} contentStyle={{ borderRadius: 12, border: "1px solid #0f102020", fontSize: 12 }} />
                <Area type="monotone" dataKey="views" stroke="#6d4aff" strokeWidth={2} fill="url(#viewsFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Metric label="Clicks" value={(post.clicks + (post.boosted?.clicks ?? 0)).toLocaleString()} />
          <Metric label="Conversions" value={post.conversions.toLocaleString()} />
          <Metric label="Cost per click" value={money(postSpend / Math.max(1, post.clicks + (post.boosted?.clicks ?? 0)), 2)} />
          <Metric label="Watched through" value={`${post.retention}%`} />
        </div>
      </div>

      {toast && <div className="fixed bottom-6 right-6 rounded-xl bg-charcoal px-4 py-3 text-sm text-white shadow-lg">{toast}</div>}
    </div>
  );
}

function Stat({ label, value, sub, good }: { label: string; value: string; sub?: string; good?: boolean }) {
  return (
    <div className="rounded-2xl border border-charcoal/[0.06] bg-white p-5">
      <div className="text-xs text-mist">{label}</div>
      <div className={clsx("mt-2 text-2xl font-semibold", good && "text-aurora")}>{value}</div>
      {sub && <div className="mt-1 text-xs text-mist">{sub}</div>}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-charcoal/[0.06] bg-white p-5">
      <div className="text-xs text-mist">{label}</div>
      <div className="mt-2 text-xl font-semibold">{value}</div>
    </div>
  );
}
