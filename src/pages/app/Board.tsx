import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useSession } from "../../lib/session";
import {
  briefs as initialBriefs,
  statusLabel,
  viewBandLabel,
  type Brief,
  type BriefStatus,
  type ViewBand,
} from "../../lib/mockData";
import { quoteBrief, type Format } from "../../lib/quote";

const columns: BriefStatus[] = ["todo", "in_progress", "in_review", "done"];

export function Board() {
  const { session } = useSession();
  const isBrand = session?.role === "brand";
  const [briefs, setBriefs] = useState<Brief[]>(initialBriefs);
  const [dragging, setDragging] = useState<string | null>(null);
  const [overCol, setOverCol] = useState<BriefStatus | null>(null);
  const [showNew, setShowNew] = useState(false);

  function moveTo(id: string, status: BriefStatus) {
    setBriefs((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  }

  function addBrief(b: Brief) {
    setBriefs((prev) => [b, ...prev]);
    setShowNew(false);
  }

  return (
    <div className="px-5 py-8 sm:px-8 sm:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-charcoal">Work board</h1>
          <p className="mt-1 text-sm text-charcoal/60">Drag a card to update where it stands. Click one to review it.</p>
        </div>
        {isBrand && (
          <button
            onClick={() => setShowNew(true)}
            className="rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-white hover:bg-signal/90"
          >
            Post a brief
          </button>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => {
          const items = briefs.filter((b) => b.status === col);
          return (
            <div
              key={col}
              onDragOver={(e) => {
                e.preventDefault();
                setOverCol(col);
              }}
              onDragLeave={() => setOverCol((c) => (c === col ? null : c))}
              onDrop={(e) => {
                e.preventDefault();
                if (dragging) moveTo(dragging, col);
                setDragging(null);
                setOverCol(null);
              }}
              className={clsx(
                "min-h-[320px] rounded-lg border p-3 transition-colors",
                overCol === col ? "border-signal bg-signal/5" : "border-charcoal/10 bg-charcoal/[0.03]"
              )}
            >
              <div className="flex items-center justify-between px-1 pb-3 text-xs font-medium text-charcoal/50">
                <span>{statusLabel[col]}</span>
                <span>{items.length}</span>
              </div>
              <div className="space-y-3">
                {items.map((b) => (
                  <Link
                    to={`/app/review?brief=${b.id}`}
                    key={b.id}
                    draggable
                    onDragStart={() => setDragging(b.id)}
                    onDragEnd={() => setDragging(null)}
                    className={clsx(
                      "block cursor-grab rounded-md border border-charcoal/10 bg-white p-3 shadow-sm active:cursor-grabbing",
                      dragging === b.id && "opacity-50"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-2xl leading-none">{b.thumbnail}</span>
                      <span className="rounded bg-charcoal/5 px-1.5 py-0.5 text-[10px] text-charcoal/50">
                        {b.platform === "tiktok" ? "TikTok" : "Instagram"}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-charcoal">{b.title}</div>
                    <div className="mt-1 text-xs text-charcoal/50">{b.creator}</div>
                    <div className="mt-2 flex items-center justify-between text-xs text-charcoal/50">
                      <span>Due {b.dueDate}</span>
                      <span className="font-data">${b.payout}</span>
                    </div>
                  </Link>
                ))}
                {items.length === 0 && (
                  <p className="px-1 py-6 text-center text-xs text-charcoal/40">Nothing here yet.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showNew && <NewBriefModal onClose={() => setShowNew(false)} onCreate={addBrief} brand={session?.name ?? "Your brand"} />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Post a brief. The payout is quoted from the view band and format, so the
// brand never negotiates per creator.
// ---------------------------------------------------------------------------

function NewBriefModal({
  onClose,
  onCreate,
  brand,
}: {
  onClose: () => void;
  onCreate: (b: Brief) => void;
  brand: string;
}) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState<"tiktok" | "instagram">("tiktok");
  const [format, setFormat] = useState<Format>("15s");
  const [band, setBand] = useState<ViewBand>("50k");
  const [hook, setHook] = useState("");
  const [dueDate, setDueDate] = useState("2026-10-05");
  const quote = quoteBrief(band, format);
  const canSubmit = title.trim().length > 0;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    onCreate({
      id: `b${Date.now()}`,
      title: title.trim(),
      brand,
      creator: "Open — matching creators",
      platform,
      status: "todo",
      dueDate,
      payout: quote,
      thumbnail: platform === "tiktok" ? "🎬" : "📸",
      brief: [`${format} ${platform === "tiktok" ? "TikTok" : "Reel"}.`, hook.trim() && `Hook: ${hook.trim()}`, `Target: ${viewBandLabel[band]}.`]
        .filter(Boolean)
        .join(" "),
    });
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/60 p-4 sm:items-center" onClick={onClose}>
      <form
        onSubmit={submit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-xl border border-charcoal/10 bg-white p-6 shadow-2xl"
      >
        <h2 className="font-display text-xl text-charcoal">Post a brief</h2>
        <p className="mt-1 text-sm text-charcoal/60">Keep it small and specific. One format, one hook, one target.</p>

        <label className="mt-5 block">
          <span className="text-xs text-charcoal/60">Title</span>
          <input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Unboxing — autumn set"
            className="mt-1 w-full rounded-md border border-charcoal/15 px-3 py-2 text-sm focus:border-signal focus:outline-none"
          />
        </label>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Field label="Platform">
            <Options value={platform} onChange={setPlatform} options={[["tiktok", "TikTok"], ["instagram", "Instagram"]]} />
          </Field>
          <Field label="Length">
            <Options value={format} onChange={setFormat} options={[["15s", "15s"], ["30s", "30s"], ["60s", "60s"]]} />
          </Field>
        </div>

        <Field label="Target view band" className="mt-4">
          <Options
            value={band}
            onChange={setBand}
            options={(Object.keys(viewBandLabel) as ViewBand[]).map((k) => [k, viewBandLabel[k].replace(" views", "")])}
          />
        </Field>

        <label className="mt-4 block">
          <span className="text-xs text-charcoal/60">The hook (first 2 seconds)</span>
          <input
            value={hook}
            onChange={(e) => setHook(e.target.value)}
            placeholder="Open on the texture, not the box"
            className="mt-1 w-full rounded-md border border-charcoal/15 px-3 py-2 text-sm focus:border-signal focus:outline-none"
          />
        </label>

        <label className="mt-4 block">
          <span className="text-xs text-charcoal/60">Due date</span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 w-full rounded-md border border-charcoal/15 px-3 py-2 text-sm focus:border-signal focus:outline-none"
          />
        </label>

        <div className="mt-6 flex items-center justify-between rounded-md bg-charcoal/[0.04] px-4 py-3">
          <div>
            <div className="text-xs text-charcoal/60">Quoted payout</div>
            <div className="text-[11px] text-charcoal/40">Funded from your balance when a creator is matched</div>
          </div>
          <div className="font-display text-2xl text-charcoal">${quote}</div>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="text-sm text-charcoal/50 hover:text-charcoal">
            Cancel
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className="rounded-md bg-signal px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
          >
            Post brief
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <span className="text-xs text-charcoal/60">{label}</span>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function Options<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: [T, string][];
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map(([v, label]) => (
        <button
          type="button"
          key={v}
          onClick={() => onChange(v)}
          className={clsx(
            "rounded-md border px-2.5 py-1.5 text-xs",
            value === v ? "border-signal bg-signal/10 text-charcoal" : "border-charcoal/15 text-charcoal/60 hover:border-charcoal/30"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
