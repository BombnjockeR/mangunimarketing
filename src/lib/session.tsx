import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Role } from "./mockData";

interface Session {
  role: Role;
  name: string;
}

interface SessionContextValue {
  session: Session | null;
  login: (role: Role, name: string) => void;
  logout: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

const STORAGE_KEY = "manguni.session";

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Session) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // localStorage unavailable — session just won't persist across reloads
    }
  }, [session]);

  const login = (role: Role, name: string) => setSession({ role, name });
  const logout = () => setSession(null);

  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within SessionProvider");
  return ctx;
}
