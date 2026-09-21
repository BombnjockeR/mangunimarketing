import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSession } from "../../lib/session";
import type { Role } from "../../lib/mockData";

export function Login() {
  const { login } = useSession();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("brand");
  const [name, setName] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(role, name.trim() || (role === "brand" ? "Aurora Skincare" : "Nadia Putri"));
    navigate("/app");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5">
      <div className="w-full max-w-sm">
        <Link to="/" className="font-display text-lg text-paper">Manguni</Link>
        <h1 className="mt-6 font-display text-2xl text-paper">Enter the workspace</h1>
        <p className="mt-2 text-sm text-mist">
          No password needed here — this is a working prototype. Pick a role to see the matching view.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <span className="text-sm text-paper">I'm here as a</span>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(["brand", "creator"] as Role[]).map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  className={`rounded-md border px-4 py-3 text-sm capitalize transition-colors ${
                    role === r
                      ? "border-signal bg-signal/10 text-paper"
                      : "border-ink-line text-mist hover:border-mist"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <label className="block">
            <span className="text-sm text-paper">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={role === "brand" ? "Aurora Skincare" : "Nadia Putri"}
              className="mt-2 w-full rounded-md border border-ink-line bg-ink-soft px-4 py-3 text-sm text-paper placeholder:text-mist/60 focus:border-signal focus:outline-none"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-md bg-signal px-4 py-3 text-sm font-medium text-white hover:bg-signal/90"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
