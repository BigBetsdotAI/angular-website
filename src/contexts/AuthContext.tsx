import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { User, getCurrentUser } from "@/lib/auth";

interface Session {
  user: User;
  access_token: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  console.log("AuthContext: rendering. User:", user, "Loading:", loading);

  useEffect(() => {
    // Check for existing session
    getCurrentUser().then((user) => {
      if (user) {
        setUser(user);
        setSession({ user, access_token: "mock-token" });
      }
      setLoading(false);
    });

    // We can add a simple listener for localStorage changes if we want multi-tab sync,
    // but for now, simple mount check is enough.
    // Ideally, we'd wrap signIn/signOut to update context state directly.
    // For now, let's assume the components calling signIn/signOut might force a reload or we expose methods here.
    // Actually, relying on just reading once at mount is fragile if signIn doesn't trigger state update.
    // But typically apps reload or `useAuth` is used to get the setter.
    // Wait, the context exposes `user`, `session`.
    // The `signIn` function in `lib/auth` updates localStorage but doesn't notify this context.
    // This is a disconnect.

    // To fix this proper "normally", the Context should probably EXPOSE signIn/signOut methods
    // that call the lib functions AND update state.
    // But `signIn`/`signOut` are imported directly from `lib/auth` in components (likely).
    // Let's check `LoginModal.tsx` or `Auth.tsx`.

    // Since I can't easily change all call sites to use `useAuth().signIn` without verifying them,
    // I will add a storage event listener to at least catch changes.
    // OR simple hack: `window.addEventListener('storage', ...)`

    const handleStorageChange = () => {
      getCurrentUser().then((user) => {
        setUser(user);
        setSession(user ? { user, access_token: "mock-token" } : null);
      });
    };

    window.addEventListener("storage", handleStorageChange);
    // Custom event for same-tab updates
    window.addEventListener("auth-change", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-change", handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
