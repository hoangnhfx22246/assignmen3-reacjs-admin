import React, { createContext, useState, useContext, useEffect } from "react";
import { loginApi, logoutApi } from "../api/admin";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("adminUser")) || null
  );
  const [expiresAt, setExpiresAt] = useState(
    JSON.parse(localStorage.getItem("tokenExpiresAt")) || null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage

    if (user && expiresAt) {
      const timeLeft = new Date(expiresAt) - new Date();
      if (timeLeft > 0) {
        const checkingExpiresAt = setTimeout(() => {
          alert("Your session has expired. Please login again.");
          logout();
        }, timeLeft);
        setLoading(false);
        return () => clearTimeout(checkingExpiresAt);
      } else {
        logout();
      }
    }
    setLoading(false);
  }, [user, expiresAt]);

  const login = async (email, password) => {
    try {
      const { userData, expiresAt } = await loginApi(email, password);
      setUser(userData);
      setExpiresAt(expiresAt);
      localStorage.setItem("adminUser", JSON.stringify(userData));
      localStorage.setItem("tokenExpiresAt", JSON.stringify(expiresAt));

      const timeLeft = new Date(expiresAt) - new Date();
      setTimeout(() => {
        logout();
      }, timeLeft);

      return { success: true };
    } catch (error) {
      return { success: false, error: error };
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
      setUser(null);
      setExpiresAt(null);
      localStorage.removeItem("adminUser");
      localStorage.removeItem("tokenExpiresAt");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
