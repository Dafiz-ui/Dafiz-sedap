import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { authAPI } from "../services/authAPI";
import { profilesAPI } from "../services/profilesAPI";
import { AuthContext } from "./AuthContextValue";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (currentSession) => {
    if (!currentSession?.user) {
      setProfile(null);
      return;
    }

    const data = await profilesAPI.getCurrentProfile(currentSession.user.id);
    setProfile(data);
  };

  useEffect(() => {
    let mounted = true;

    authAPI
      .getSession()
      .then(async (currentSession) => {
        if (!mounted) return;
        setSession(currentSession);
        await loadProfile(currentSession);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    const { data } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession);
      await loadProfile(currentSession);
      setLoading(false);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await authAPI.logout();
    setSession(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ session, user: session?.user || null, profile, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
