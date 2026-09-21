import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import clsx from "clsx";
import { useSession } from "../../lib/session";
import { Icon } from "../../components/Icons";
import type { Role } from "../../lib/mockData";

export function Login() {
  const { login } = useSession();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [role, setRole] = useState<Role>(params.get("role") === "creator" ? "creator" : "brand");
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(role, name.trim() || (role === "brand" ? "Aurora Skincare" : "Nadia Putri"));
    navigate("/app");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
        <Link to="/" className="text-lg font-bold tracking-tight">
          Manguni
        </Link>
        <h1 className="mt-6 text-2xl font-bold">Sign in</h1>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {(["brand", "creator"] as Role[]).map((r) => {
            const I = r === "brand" ? Icon.briefcase : Icon.sparkle;
            return (
              <button
                type="button"
                key={r}
                onClick={() => setRole(r)}
                className={clsx(
                  "flex flex-col items-center gap-2 rounded-xl border-2 px-3 py-5 text-sm font-medium capitalize transition-colors",
                  role === r ? "border-signal bg-signal-soft text-signal-dim" : "border-charcoal/10 text-mist hover:border-charcoal/25"
                )}
              >
                <I className="h-6 w-6" />
                {r}
              </button>
            );
          })}
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-medium">Your name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={role === "brand" ? "Aurora Skincare" : "Nadia Putri"}
            className="mt-2 w-full rounded-xl border border-charcoal/15 px-4 py-3 text-sm focus:border-signal focus:outline-none"
          />
        </label>

        <button type="submit" className="mt-6 w-full rounded-full bg-charcoal py-3 text-sm font-semibold text-white hover:bg-charcoal/90">
          Continue
        </button>
        <p className="mt-4 text-center text-xs text-mist">Prototype — no password needed.</p>
      </form>
    </div>
  );
}
