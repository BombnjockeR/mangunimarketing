import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../lib/session";

export function Navbar() {
  const { session, logout } = useSession();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 border-b border-charcoal/[0.06] bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="text-lg font-bold tracking-tight text-charcoal">
          Manguni
        </Link>
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="text-sm text-mist hover:text-charcoal"
              >
                Log out
              </button>
              <Link to="/app" className="rounded-full bg-charcoal px-4 py-2 text-sm font-medium text-white hover:bg-charcoal/90">
                Open workspace
              </Link>
            </>
          ) : (
            <Link to="/login" className="rounded-full bg-charcoal px-4 py-2 text-sm font-medium text-white hover:bg-charcoal/90">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
