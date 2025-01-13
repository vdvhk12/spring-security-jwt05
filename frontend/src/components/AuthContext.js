import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({children}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("accessToken", token);
  }

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("accessToken");
    navigate("/");
  }

  return (
      <AuthContext.Provider value={{isAuthenticated, login, logout}}>
        {children}
      </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider };