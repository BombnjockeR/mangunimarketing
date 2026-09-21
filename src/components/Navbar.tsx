import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../lib/session";

export function Navbar() {
  const { session, logout } = useSession();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 border-b border-ink-line/60 bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="font-display text-lg tracking-tight text-paper">
          Manguni
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-mist md:flex">
          <a href="/#product" className="hover:text-paper">Product</a>
          <a href="/#payment" className="hover:text-paper">Payments</a>
          <a href="/#features" className="hover:text-paper">Features</a>
          <a href="/#creators" className="hover:text-paper">For creators</a>
        </nav>
        <div className="flex items-center gap-3">
          {session ? (
            <>
              <Link
                to="/app"
                className="rounded-md bg-paper px-4 py-2 text-sm font-medium text-ink hover:bg-white"
              >
                Open workspace
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="text-sm text-mist hover:text-paper"
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-md bg-paper px-4 py-2 text-sm font-medium text-ink hover:bg-white"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
