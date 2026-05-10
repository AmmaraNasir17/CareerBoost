import { createContext, useState, useEffect } from "react";
import { apiRequest } from "../services/api";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [role, setRole] = useState(() => localStorage.getItem("role"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    apiRequest("/auth/me", "GET", null, token)
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        localStorage.clear();
        setToken(null);
        setRole(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const login = (tokenValue, roleValue) => {
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("role", roleValue);
    setToken(tokenValue);
    setRole(roleValue);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, role, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}