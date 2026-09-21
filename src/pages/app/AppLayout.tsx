import { useState } from "react";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useSession } from "../../lib/session";
import { Icon } from "../../components/Icons";

export function AppLayout() {
  const { session, logout } = useSession();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!session) return <Navigate to="/login" replace />;

  const nav = [
    { to: "/app", label: "Home", icon: Icon.home, end: true },
    { to: "/app/discover", label: session.role === "brand" ? "Creators" : "Briefs", icon: Icon.users },
    { to: "/app/board", label: "Board", icon: Icon.board },
    { to: "/app/review", label: "Review", icon: Icon.pin },
    { to: "/app/analytics", label: "Results", icon: Icon.chart },
    { to: "/app/payments", label: "Payments", icon: Icon.wallet },
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
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
          isActive ? "bg-signal-soft text-signal-dim" : "text-mist hover:bg-paper hover:text-charcoal"
        )
      }
    >
      <item.icon className="h-5 w-5" />
      {item.label}
    </NavLink>
  ));

  const account = (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-signal text-sm font-semibold text-white">
        {session.name.charAt(0).toUpperCase()}
      </div>
      <div className="min-w-0">
        <div className="truncate text-sm font-medium">{session.name}</div>
        <button onClick={signOut} className="text-xs text-mist hover:text-charcoal">
          Log out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-paper md:flex-row">
      <aside className="hidden w-60 shrink-0 flex-col justify-between border-r border-charcoal/[0.06] bg-white px-4 py-6 md:flex">
        <div>
          <div className="px-3 text-lg font-bold tracking-tight">Manguni</div>
          <nav className="mt-8 flex flex-col gap-1">{links}</nav>
        </div>
        <div className="px-1">{account}</div>
      </aside>

      <header className="sticky top-0 z-30 border-b border-charcoal/[0.06] bg-white md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="text-base font-bold tracking-tight">Manguni</div>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-lg p-2 text-charcoal hover:bg-paper"
          >
            {open ? <Icon.x className="h-5 w-5" /> : <Icon.menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <nav className="flex flex-col gap-1 border-t border-charcoal/[0.06] px-3 py-3">
            {links}
            <div className="mt-2 border-t border-charcoal/[0.06] px-2 pt-4">{account}</div>
          </nav>
        )}
      </header>

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
