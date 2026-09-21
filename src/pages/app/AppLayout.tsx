import { useState } from "react";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSession } from "../../lib/session";
import clsx from "clsx";

export function AppLayout() {
  const { session, logout } = useSession();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!session) return <Navigate to="/login" replace />;

  const nav = [
    { to: "/app", label: "Overview", end: true },
    { to: "/app/discover", label: session.role === "brand" ? "Creators" : "Open briefs" },
    { to: "/app/board", label: "Board" },
    { to: "/app/review", label: "Review" },
    { to: "/app/analytics", label: "Performance" },
    { to: "/app/payments", label: "Payments" },
  ];

  function signOut() {
    logout();
    navigate("/");
  }

  const links = nav.map((item) => (
    <NavLink
      key={item.to}
      to={item.to}
      end={item.end}
      onClick={() => setOpen(false)}
      className={({ isActive }) =>
        clsx(
          "rounded-md px-3 py-2 text-sm transition-colors",
          isActive ? "bg-ink-soft text-paper" : "text-mist hover:text-paper"
        )
      }
    >
      {item.label}
    </NavLink>
  ));

  return (
    <div className="flex min-h-screen flex-col bg-paper md:flex-row">
      {/* Desktop sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col justify-between border-r border-charcoal/10 bg-ink px-4 py-6 md:flex">
        <div>
          <div className="px-2 font-display text-lg text-paper">Manguni</div>
          <nav className="mt-8 flex flex-col gap-1">{links}</nav>
        </div>
        <div className="px-2">
          <div className="text-sm text-paper">{session.name}</div>
          <div className="text-xs capitalize text-mist">{session.role} account</div>
          <button onClick={signOut} className="mt-3 text-xs text-mist hover:text-paper">
            Log out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 border-b border-ink-line/60 bg-ink md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="font-display text-base text-paper">Manguni</div>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-md border border-ink-line px-3 py-1.5 text-xs text-paper"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
        {open && (
          <nav className="flex flex-col gap-1 border-t border-ink-line/60 px-3 py-3">
            {links}
            <div className="mt-2 flex items-center justify-between px-3 pt-3 text-xs text-mist">
              <span>
                {session.name} · <span className="capitalize">{session.role}</span>
              </span>
              <button onClick={signOut} className="hover:text-paper">
                Log out
              </button>
            </div>
          </nav>
        )}
      </header>

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
