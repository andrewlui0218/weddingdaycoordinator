import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: { uid: string } | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ uid: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for the passcode state
    const isAuthed = localStorage.getItem('wedding_passcode') === '2504';
    if (isAuthed) {
      setUser({ uid: 'guest_user' });
    }
    setLoading(false);
  }, []);

  const signIn = async () => {
    const code = window.prompt("Please enter the passcode:");
    if (code === '2504') {
      localStorage.setItem('wedding_passcode', '2504');
      setUser({ uid: 'guest_user' });
    } else if (code !== null) {
      alert("Incorrect passcode");
    }
  };

  const signOut = async () => {
    localStorage.removeItem('wedding_passcode');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
