import { useEffect, useState } from "react";
import { performance as perf } from "../lib/mockData";

function formatViews(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 100000 ? 0 : 1)}K`;
  return `${n}`;
}

// A monitor-wall of live posts, each view count ticking up — the one
// deliberate motion moment on the page, standing in for the thesis
// ("views, tracked live, are the real signal").
export function LiveFeedWall() {
  const seed = perf.slice(0, 6);
  const [counts, setCounts] = useState(seed.map((p) => Math.round(p.views * 0.9)));

  useEffect(() => {
    const id = setInterval(() => {
      setCounts((prev) =>
        prev.map((c, i) => {
          const target = seed[i].views;
          if (c >= target) return c;
          return Math.min(target, c + Math.round(target * 0.012));
        })
      );
    }, 220);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {seed.map((p, i) => (
        <div
          key={`${p.id}-${i}`}
          className="tick-in rounded-lg border border-ink-line bg-ink-soft p-3 sm:p-4"
          style={{ animationDelay: `${i * 90}ms` }}
        >
          <div className="flex items-center justify-between text-[11px] text-mist">
            <span className="uppercase tracking-wide">{p.platform === "tiktok" ? "TikTok" : "Instagram"}</span>
            <span className="flex items-center gap-1 text-signal">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              live
            </span>
          </div>
          <div className="mt-3 font-display text-xl sm:text-2xl text-paper tabular-nums">
            {formatViews(counts[i])}
          </div>
          <div className="mt-1 text-[11px] text-mist">views this week</div>
        </div>
      ))}
    </div>
  );
}
