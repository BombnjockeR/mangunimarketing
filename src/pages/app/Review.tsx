import { useState } from "react";
import { briefs, pins as initialPins, type Pin } from "../../lib/mockData";
import { useSession } from "../../lib/session";
import clsx from "clsx";

const reviewable = briefs.filter((b) => b.status === "in_review" || b.status === "in_progress");

export function Review() {
  const { session } = useSession();
  const [activeId, setActiveId] = useState(reviewable[0]?.id ?? briefs[0].id);
  const [pinsByBrief, setPinsByBrief] = useState<Record<string, Pin[]>>(initialPins);
  const [draft, setDraft] = useState<{ x: number; y: number } | null>(null);
  const [note, setNote] = useState("");

  const brief = briefs.find((b) => b.id === activeId)!;
  const pins = pinsByBrief[activeId] ?? [];

  function handleCanvasClick(e: React.MouseEvent<HTMLDivElement>) {
    if (draft) return; // finish or cancel the open draft first
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setDraft({ x, y });
    setNote("");
  }

  function saveDraft() {
    if (!draft || !note.trim()) return;
    const pin: Pin = {
      id: `p${Date.now()}`,
      x: draft.x,
      y: draft.y,
      note: note.trim(),
      resolved: false,
      author: session?.name ?? "You",
      createdAt: new Date().toISOString(),
    };
    setPinsByBrief((prev) => ({ ...prev, [activeId]: [...(prev[activeId] ?? []), pin] }));
    setDraft(null);
    setNote("");
  }

  function toggleResolved(pinId: string) {
    setPinsByBrief((prev) => ({
      ...prev,
      [activeId]: (prev[activeId] ?? []).map((p) => (p.id === pinId ? { ...p, resolved: !p.resolved } : p)),
    }));
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="border-b border-charcoal/10 bg-white px-8 py-5">
        <h1 className="font-display text-2xl text-charcoal">Review</h1>
        <p className="mt-1 text-sm text-charcoal/60">Click anywhere on the frame to leave a note at that exact spot.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {reviewable.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                setActiveId(b.id);
                setDraft(null);
              }}
              className={clsx(
                "rounded-full border px-3 py-1.5 text-xs",
                activeId === b.id ? "border-signal bg-signal/10 text-charcoal" : "border-charcoal/15 text-charcoal/60 hover:border-charcoal/30"
              )}
            >
              {b.thumbnail} {b.title}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 items-center justify-center bg-charcoal/5 p-8">
          <div
            onClick={handleCanvasClick}
            className="relative aspect-9/16 w-full max-w-sm cursor-crosshair overflow-hidden rounded-xl border border-charcoal/15 bg-gradient-to-br from-ink via-ink-soft to-signal-dim shadow-lg"
          >
            <div className="flex h-full w-full items-center justify-center text-7xl opacity-90">
              {brief.thumbnail}
            </div>
            <div className="absolute bottom-3 left-3 rounded bg-black/40 px-2 py-1 text-[11px] text-white/80">
              {brief.title}
            </div>

            {pins.map((p) => (
              <button
                key={p.id}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleResolved(p.id);
                }}
                title={p.note}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                className={clsx(
                  "absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-[11px] font-medium text-white shadow",
                  p.resolved ? "bg-aurora" : "bg-signal"
                )}
              >
                {p.resolved ? "✓" : ""}
              </button>
            ))}

            {draft && (
              <div
                style={{ left: `${draft.x}%`, top: `${draft.y}%` }}
                className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-white bg-signal/60"
              />
            )}
          </div>
        </div>

        <aside className="w-80 shrink-0 overflow-y-auto border-l border-charcoal/10 bg-white p-5">
          {draft && (
            <div className="mb-5 rounded-lg border border-signal/40 bg-signal/5 p-3">
              <div className="text-xs font-medium text-charcoal">New note at this spot</div>
              <textarea
                autoFocus
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What needs to change here?"
                rows={3}
                className="mt-2 w-full resize-none rounded-md border border-charcoal/15 px-3 py-2 text-sm focus:border-signal focus:outline-none"
              />
              <div className="mt-2 flex justify-end gap-2">
                <button onClick={() => setDraft(null)} className="text-xs text-charcoal/50 hover:text-charcoal">
                  Cancel
                </button>
                <button
                  onClick={saveDraft}
                  disabled={!note.trim()}
                  className="rounded-md bg-signal px-3 py-1.5 text-xs font-medium text-white disabled:opacity-40"
                >
                  Add note
                </button>
              </div>
            </div>
          )}

          <div className="text-xs font-medium uppercase tracking-wide text-charcoal/50">
            Notes ({pins.filter((p) => !p.resolved).length} open)
          </div>
          <ul className="mt-3 space-y-3">
            {pins.length === 0 && !draft && (
              <li className="text-sm text-charcoal/50">No notes yet — click the frame to add one.</li>
            )}
            {pins.map((p) => (
              <li key={p.id} className={clsx("rounded-lg border p-3", p.resolved ? "border-charcoal/10 bg-charcoal/5" : "border-charcoal/15 bg-white")}>
                <p className={clsx("text-sm", p.resolved ? "text-charcoal/40 line-through" : "text-charcoal")}>{p.note}</p>
                <div className="mt-2 flex items-center justify-between text-xs text-charcoal/40">
                  <span>{p.author}</span>
                  <button onClick={() => toggleResolved(p.id)} className="text-signal hover:underline">
                    {p.resolved ? "Reopen" : "Mark fixed"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
