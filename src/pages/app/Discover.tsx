import { useMemo, useState } from "react";
import clsx from "clsx";
import { useSession } from "../../lib/session";
import { creators, openBriefs, viewBandLabel, type Creator } from "../../lib/mockData";
import { formatCompact } from "../../lib/quote";

type SortKey = "medianViews" | "followers";

export function Discover() {
  const { session } = useSession();
  return session?.role === "brand" ? <CreatorScorecards /> : <OpenBriefs />;
}

// ---------------------------------------------------------------------------
// Brand view: creators ranked by what their content actually did.
// ---------------------------------------------------------------------------

function CreatorScorecards() {
  const [sort, setSort] = useState<SortKey>("medianViews");
  const [platform, setPlatform] = useState<"all" | "instagram" | "tiktok">("all");
  const [invited, setInvited] = useState<Set<string>>(new Set());

  const list = useMemo(() => {
    return creators
      .filter((c) => platform === "all" || c.platform === platform)
      .sort((a, b) => b[sort] - a[sort]);
  }, [sort, platform]);

  return (
    <div className="px-5 py-8 sm:px-8 sm:py-10">
      <h1 className="text-2xl font-bold text-charcoal">Creators</h1>
      <p className="mt-1 max-w-xl text-sm text-charcoal/60">
        Ranked by views on their last ten posts.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex rounded-md border border-charcoal/15 bg-white p-0.5 text-xs">
          <SegButton active={sort === "medianViews"} onClick={() => setSort("medianViews")}>
            Sort by median views
          </SegButton>
          <SegButton active={sort === "followers"} onClick={() => setSort("followers")}>
            Sort by followers
          </SegButton>
        </div>
        <div className="flex rounded-md border border-charcoal/15 bg-white p-0.5 text-xs">
          {(["all", "tiktok", "instagram"] as const).map((p) => (
            <SegButton key={p} active={platform === p} onClick={() => setPlatform(p)}>
              {p === "all" ? "All platforms" : p === "tiktok" ? "TikTok" : "Instagram"}
            </SegButton>
          ))}
        </div>
      </div>

      {sort === "followers" && (
        <p className="mt-4 rounded-md border border-gold/40 bg-gold/10 px-3 py-2 text-xs text-charcoal/80">
          By followers, the two lowest performers come out on top.
        </p>
      )}

      <ol className="mt-6 space-y-3">
        {list.map((c, i) => (
          <li key={c.id}>
            <CreatorRow
              rank={i + 1}
              creator={c}
              invited={invited.has(c.id)}
              onInvite={() => setInvited((s) => new Set(s).add(c.id))}
            />
          </li>
        ))}
      </ol>
    </div>
  );
}

function CreatorRow({
  rank,
  creator: c,
  invited,
  onInvite,
}: {
  rank: number;
  creator: Creator;
  invited: boolean;
  onInvite: () => void;
}) {
  const ratio = c.medianViews / c.followers;
  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 rounded-xl border border-charcoal/[0.06] bg-white p-4 sm:grid-cols-[auto_1.4fr_1fr_1fr_auto] sm:items-center">
      <div className="flex items-center gap-3">
        <span className="w-5 font-data text-xs text-charcoal/40">{rank}</span>
        <span className="text-2xl leading-none">{c.avatar}</span>
      </div>
      <div className="min-w-0">
        <div className="truncate text-sm text-charcoal">{c.name}</div>
        <div className="truncate text-xs text-charcoal/50">
          {c.handle} · {c.niche} · {c.platform === "tiktok" ? "TikTok" : "Instagram"}
        </div>
      </div>

      <div className="col-span-2 grid grid-cols-2 gap-3 sm:col-span-1 sm:grid-cols-1 sm:gap-1">
        <div>
          <div className="text-[11px] text-charcoal/50">Median views, last 10</div>
          <div className="text-lg font-semibold text-charcoal">{formatCompact(c.medianViews)}</div>
        </div>
        <div>
          <div className="text-[11px] text-charcoal/50">Followers</div>
          <div className="text-sm text-charcoal/60">
            {formatCompact(c.followers)}
            <span className={clsx("ml-1.5 text-[11px]", ratio >= 1 ? "text-aurora" : "text-charcoal/40")}>
              {ratio >= 1 ? `${ratio.toFixed(0)}× reach` : `${(ratio * 100).toFixed(0)}% reach`}
            </span>
          </div>
        </div>
      </div>

      <div className="col-span-2 sm:col-span-1">
        <Sparkline values={c.recentViews} />
        <div className="mt-1 flex gap-3 text-[11px] text-charcoal/50">
          <span>{c.retention}% retention</span>
          <span>{c.onTimeRate}% on time</span>
          <span>{c.briefsCompleted} briefs</span>
        </div>
      </div>

      <div className="col-span-2 sm:col-span-1">
        <button
          onClick={onInvite}
          disabled={invited}
          className={clsx(
            "w-full rounded-md px-3 py-2 text-xs font-medium sm:w-auto",
            invited ? "bg-aurora/15 text-aurora" : "bg-charcoal text-white hover:bg-charcoal/90"
          )}
        >
          {invited ? "Invited" : "Invite to brief"}
        </button>
      </div>
    </div>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const w = 120;
  const h = 28;
  const max = Math.max(...values);
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * w},${h - (v / max) * (h - 4) - 2}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden className="block">
      <polyline points={pts} fill="none" stroke="#6d4aff" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function SegButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={clsx("rounded px-3 py-1.5", active ? "bg-charcoal text-white" : "text-charcoal/60 hover:text-charcoal")}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Creator view: funded briefs you can apply to. Payout is set by view band.
// ---------------------------------------------------------------------------

function OpenBriefs() {
  const [applied, setApplied] = useState<Set<string>>(new Set());

  return (
    <div className="px-5 py-8 sm:px-8 sm:py-10">
      <h1 className="text-2xl font-bold text-charcoal">Open briefs</h1>
      <p className="mt-1 max-w-xl text-sm text-charcoal/60">
        Already funded. Payout is fixed by the target views.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {openBriefs.map((b) => {
          const isApplied = applied.has(b.id);
          return (
            <div key={b.id} className="flex flex-col rounded-xl border border-charcoal/[0.06] bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-charcoal">{b.title}</div>
                  <div className="mt-0.5 text-xs text-charcoal/50">
                    {b.brand} · {b.platform === "tiktok" ? "TikTok" : "Instagram"}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-charcoal">${b.payout}</div>
                  <div className="text-[11px] text-aurora">Funded</div>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{b.summary}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-charcoal/50">
                <span>Target {viewBandLabel[b.viewBand]}</span>
                <span>Due {b.dueDate}</span>
                <span>{b.applicants} applied</span>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setApplied((s) => new Set(s).add(b.id))}
                  disabled={isApplied}
                  className={clsx(
                    "rounded-md px-4 py-2 text-xs font-medium",
                    isApplied ? "bg-aurora/15 text-aurora" : "bg-signal text-white hover:bg-signal/90"
                  )}
                >
                  {isApplied ? "Applied" : "Apply"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
