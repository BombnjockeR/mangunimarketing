import { useState } from "react";
import { useSession } from "../../lib/session";
import { transactions as initialTx, walletBalance, briefs, type Transaction } from "../../lib/mockData";
import clsx from "clsx";

function money(n: number) {
  return `$${n.toLocaleString()}`;
}

const statusStyle: Record<Transaction["status"], string> = {
  released: "text-aurora",
  escrowed: "text-gold",
  pending_review: "text-charcoal/50",
};

const statusText: Record<Transaction["status"], string> = {
  released: "Released",
  escrowed: "Escrowed",
  pending_review: "Awaiting approval",
};

export function Payments() {
  const { session } = useSession();
  const isBrand = session?.role === "brand";
  const [tx, setTx] = useState<Transaction[]>(initialTx);
  const [toast, setToast] = useState<string | null>(null);
  const [funded, setFunded] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);

  function release(id: string) {
    setTx((prev) => prev.map((t) => (t.id === id ? { ...t, status: "released", releasedAt: new Date().toISOString() } : t)));
    showToast("Approved — the creator's share has been released instantly.");
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  }

  const brandAvailable = walletBalance.brand.available + (funded ? 5000 : 0);
  const creatorAvailable = walletBalance.creator.availableNow + (withdrawn ? 0 : 0);

  return (
    <div className="px-5 py-8 sm:px-8 sm:py-10">
      <h1 className="text-2xl font-bold text-charcoal">Payments</h1>
      <p className="mt-1 text-sm text-charcoal/60">
        {isBrand
          ? "Fund once. Approve work, and creators are paid instantly."
          : "Paid the moment your work is approved."}
      </p>

      {isBrand ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Stat label="Funded this month" value={money(walletBalance.brand.funded)} />
          <Stat label="In escrow" value={money(walletBalance.brand.escrowed)} tone="gold" />
          <Stat label="Available to fund briefs" value={money(brandAvailable)} tone="aurora" />
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Stat label="Available now" value={money(creatorAvailable)} tone="signal" />
          <Stat label="Pending approval" value={money(walletBalance.creator.pendingReview)} tone="gold" />
          <Stat label="Lifetime earned" value={money(walletBalance.creator.lifetimeEarned)} />
        </div>
      )}

      <div className="mt-6 flex gap-3">
        {isBrand ? (
          <button
            onClick={() => {
              setFunded(true);
              showToast("Balance funded — $5,000 added, ready to back new briefs.");
            }}
            className="rounded-full bg-charcoal px-4 py-2.5 text-sm font-medium text-white hover:bg-charcoal/90"
          >
            Fund balance
          </button>
        ) : (
          <button
            onClick={() => {
              setWithdrawn(true);
              showToast("Withdrawal sent — funds should land in your account within minutes.");
            }}
            disabled={creatorAvailable === 0}
            className="rounded-full bg-signal px-4 py-2.5 text-sm font-medium text-white hover:bg-signal/90 disabled:opacity-40"
          >
            Withdraw instantly
          </button>
        )}
      </div>

      <div className="mt-10">
        <div className="text-sm font-medium text-charcoal">Transaction history</div>
        <div className="mt-3 overflow-x-auto rounded-xl border border-charcoal/[0.06] bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-charcoal/10 text-xs uppercase tracking-wide text-charcoal/40">
                <th className="px-4 py-3 font-medium">Milestone</th>
                <th className="px-4 py-3 font-medium">Brief</th>
                {isBrand && <th className="px-4 py-3 font-medium">Creator</th>}
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                {isBrand && <th className="px-4 py-3" />}
              </tr>
            </thead>
            <tbody>
              {tx.map((t) => (
                <tr key={t.id} className="border-b border-charcoal/5 last:border-0">
                  <td className="px-4 py-3 text-charcoal">{t.milestone}</td>
                  <td className="px-4 py-3 text-charcoal/60">{briefs.find((b) => b.id === t.briefId)?.title}</td>
                  {isBrand && <td className="px-4 py-3 text-charcoal/60">{t.creator}</td>}
                  <td className="px-4 py-3 font-data text-charcoal">${t.amount}</td>
                  <td className={clsx("px-4 py-3", statusStyle[t.status])}>{statusText[t.status]}</td>
                  {isBrand && (
                    <td className="px-4 py-3 text-right">
                      {t.status === "pending_review" && (
                        <button onClick={() => release(t.id)} className="text-xs font-medium text-signal hover:underline">
                          Approve & release
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 rounded-full bg-charcoal px-4 py-3 text-sm text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "gold" | "aurora" | "signal" }) {
  const color = tone === "gold" ? "text-gold" : tone === "aurora" ? "text-aurora" : tone === "signal" ? "text-signal" : "text-charcoal";
  return (
    <div className="rounded-xl border border-charcoal/[0.06] bg-white p-5">
      <div className="text-xs text-charcoal/50">{label}</div>
      <div className={clsx("mt-2 text-2xl font-semibold", color)}>{value}</div>
    </div>
  );
}
