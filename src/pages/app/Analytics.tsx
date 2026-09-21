import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { performance as perf, briefs } from "../../lib/mockData";

function money(n: number) {
  return n >= 1000 ? `${Math.round(n / 1000)}K` : `${n}`;
}

export function Analytics() {
  const [activeId, setActiveId] = useState(perf[0].id);
  const post = perf.find((p) => p.id === activeId)!;
  const brief = briefs.find((b) => b.id === post.briefId);

  const platformTotals = ["instagram", "tiktok"].map((platform) => ({
    platform: platform === "instagram" ? "Instagram" : "TikTok",
    views: perf.filter((p) => p.platform === platform).reduce((s, p) => s + p.views, 0),
  }));

  return (
    <div className="px-5 py-8 sm:px-8 sm:py-10">
      <h1 className="font-display text-2xl text-charcoal">Performance</h1>
      <p className="mt-1 text-sm text-charcoal/60">Pulled straight from the platform — no screenshots, no waiting.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {perf.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveId(p.id)}
            className={`rounded-full border px-3 py-1.5 text-xs ${
              activeId === p.id ? "border-signal bg-signal/10 text-charcoal" : "border-charcoal/15 text-charcoal/60 hover:border-charcoal/30"
            }`}
          >
            {briefs.find((b) => b.id === p.briefId)?.title}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-lg border border-charcoal/10 bg-white p-6">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-xs text-charcoal/50">{brief?.title}</div>
              <div className="font-display text-3xl text-charcoal">{post.views.toLocaleString()} views</div>
            </div>
            <span className="rounded bg-charcoal/5 px-2 py-1 text-[11px] uppercase text-charcoal/50">
              {post.platform}
            </span>
          </div>
          <div className="mt-6 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={post.history} margin={{ left: 0, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2fd6bd" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#2fd6bd" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1b1c221a" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#1b1c2299" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={money} tick={{ fontSize: 11, fill: "#1b1c2299" }} axisLine={false} tickLine={false} width={40} />
                <Tooltip
                  formatter={(v) => Number(v).toLocaleString()}
                  contentStyle={{ borderRadius: 8, border: "1px solid #1b1c2220", fontSize: 12 }}
                />
                <Area type="monotone" dataKey="views" stroke="#1a9c89" strokeWidth={2} fill="url(#viewsFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Metric label="Likes" value={post.likes.toLocaleString()} />
          <Metric label="Comments" value={post.comments.toLocaleString()} />
          <Metric label="Shares" value={post.shares.toLocaleString()} />
          <Metric label="Retention" value={`${post.retention}%`} />
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-charcoal/10 bg-white p-6">
        <div className="text-sm text-charcoal">Views by platform, all active briefs</div>
        <div className="mt-4 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={platformTotals} layout="vertical" margin={{ left: 0 }}>
              <XAxis type="number" tickFormatter={money} tick={{ fontSize: 11, fill: "#1b1c2299" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="platform" tick={{ fontSize: 12, fill: "#1b1c22" }} axisLine={false} tickLine={false} width={70} />
              <Tooltip formatter={(v) => Number(v).toLocaleString()} contentStyle={{ borderRadius: 8, border: "1px solid #1b1c2220", fontSize: 12 }} />
              <Bar dataKey="views" radius={[0, 4, 4, 0]} fill="#ff3d57" barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-charcoal/10 bg-white p-5">
      <div className="text-xs text-charcoal/50">{label}</div>
      <div className="mt-2 font-display text-xl text-charcoal">{value}</div>
    </div>
  );
}
