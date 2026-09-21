import { Link } from "react-router-dom";
import { useSession } from "../../lib/session";
import { briefs, transactions, walletBalance, statusLabel } from "../../lib/mockData";
import { StatusDot } from "../../components/StatusDot";

function money(n: number) {
  return `$${n.toLocaleString()}`;
}

export function Overview() {
  const { session } = useSession();
  const isBrand = session?.role === "brand";
  // Mock data isn't tied to the typed-in name, so show the whole workspace.
  const mine = briefs;

  const active = mine.filter((b) => b.status !== "done");
  const dueSoon = [...mine].sort((a, b) => a.dueDate.localeCompare(b.dueDate)).slice(0, 4);

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">
      <h1 className="text-2xl font-bold text-charcoal">
        {isBrand ? `Welcome back, ${session?.name}` : `Hi ${session?.name}`}
      </h1>
      <p className="mt-1 text-sm text-charcoal/60">
        {isBrand
          ? "What's happening across your briefs."
          : "What's in progress and what's ready to pay out."}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {isBrand ? (
          <>
            <StatCard label="Active briefs" value={String(active.length)} />
            <StatCard label="Escrowed balance" value={money(walletBalance.brand.escrowed)} />
            <StatCard label="Available to fund new briefs" value={money(walletBalance.brand.available)} />
          </>
        ) : (
          <>
            <StatCard label="Active briefs" value={String(active.length)} />
            <StatCard label="Available now" value={money(walletBalance.creator.availableNow)} tone="signal" />
            <StatCard label="Lifetime earned" value={money(walletBalance.creator.lifetimeEarned)} />
          </>
        )}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-charcoal">Coming up</h2>
            <Link to="/app/board" className="text-sm text-signal hover:underline">
              View board
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-charcoal/10 rounded-xl border border-charcoal/[0.06] bg-white">
            {dueSoon.map((b) => (
              <li key={b.id} className="flex items-center gap-3 px-4 py-3">
                <StatusDot status={b.status} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm text-charcoal">{b.title}</div>
                  <div className="text-xs text-charcoal/50">
                    {statusLabel[b.status]} · due {b.dueDate}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-charcoal">Recent payments</h2>
            <Link to="/app/payments" className="text-sm text-signal hover:underline">
              View all
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-charcoal/10 rounded-xl border border-charcoal/[0.06] bg-white">
            {transactions.slice(0, 4).map((t) => (
              <li key={t.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="text-sm text-charcoal">{t.milestone}</div>
                  <div className="text-xs text-charcoal/50">{t.creator}</div>
                </div>
                <div className="text-right">
                  <div className="font-data text-sm text-charcoal">${t.amount}</div>
                  <div
                    className={`text-xs capitalize ${
                      t.status === "released" ? "text-aurora" : t.status === "escrowed" ? "text-gold" : "text-mist"
                    }`}
                  >
                    {t.status.replace("_", " ")}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, tone }: { label: string; value: string; tone?: "signal" }) {
  return (
    <div className="rounded-xl border border-charcoal/[0.06] bg-white p-5">
      <div className="text-xs text-charcoal/50">{label}</div>
      <div className={`mt-2 text-2xl font-semibold ${tone === "signal" ? "text-signal" : "text-charcoal"}`}>
        {value}
      </div>
    </div>
  );
}
