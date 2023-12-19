// AuthContext.js проверяем заполнял ли пользователь форму
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true" || false
  );

  const authenticate = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
  };

  useEffect(() => {
    const sessionTimeout = localStorage.getItem("sessionTimeout");
    if (sessionTimeout) {
      const currentTime = new Date().getTime();
      if (currentTime > parseInt(sessionTimeout)) {
        // Время сессии истекло, выход пользователя
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
