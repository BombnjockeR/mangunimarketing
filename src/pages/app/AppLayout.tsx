import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSession } from "../../lib/session";
import clsx from "clsx";

const brandNav = [
  { to: "/app", label: "Overview", end: true },
  { to: "/app/board", label: "Board" },
  { to: "/app/review", label: "Review" },
  { to: "/app/analytics", label: "Performance" },
  { to: "/app/payments", label: "Payments" },
];

export function AppLayout() {
  const { session, logout } = useSession();
  const navigate = useNavigate();

  if (!session) return <Navigate to="/login" replace />;

  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="flex w-56 shrink-0 flex-col justify-between border-r border-charcoal/10 bg-ink px-4 py-6">
        <div>
          <div className="px-2 font-display text-lg text-paper">Manguni</div>
          <nav className="mt-8 flex flex-col gap-1">
            {brandNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  clsx(
                    "rounded-md px-3 py-2 text-sm transition-colors",
                    isActive ? "bg-ink-soft text-paper" : "text-mist hover:text-paper"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="px-2">
          <div className="text-sm text-paper">{session.name}</div>
          <div className="text-xs capitalize text-mist">{session.role} account</div>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="mt-3 text-xs text-mist hover:text-paper"
          >
            Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
