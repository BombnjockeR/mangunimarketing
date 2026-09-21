import { useState } from "react";
import { Link } from "react-router-dom";
import { briefs as initialBriefs, statusLabel, type Brief, type BriefStatus } from "../../lib/mockData";
import clsx from "clsx";

const columns: BriefStatus[] = ["todo", "in_progress", "in_review", "done"];

export function Board() {
  const [briefs, setBriefs] = useState<Brief[]>(initialBriefs);
  const [dragging, setDragging] = useState<string | null>(null);
  const [overCol, setOverCol] = useState<BriefStatus | null>(null);

  function moveTo(id: string, status: BriefStatus) {
    setBriefs((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  }

  return (
    <div className="px-8 py-10">
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="font-display text-2xl text-charcoal">Work board</h1>
          <p className="mt-1 text-sm text-charcoal/60">Drag a card to update where it stands.</p>
        </div>
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
              <div className="flex items-center justify-between px-1 pb-3 text-xs font-medium uppercase tracking-wide text-charcoal/50">
                <span>{statusLabel[col]}</span>
                <span>{items.length}</span>
              </div>
              <div className="space-y-3">
                {items.map((b) => (
                  <Link
                    to="/app/review"
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
                      <span className="rounded bg-charcoal/5 px-1.5 py-0.5 text-[10px] uppercase text-charcoal/50">
                        {b.platform}
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
