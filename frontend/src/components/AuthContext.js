import React, {createContext, useState, useContext, useEffect} from "react";

const AuthContext = createContext();

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({children}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
  }

  return (
      <AuthContext.Provider value={{isAuthenticated, login, logout}}>
        {children}
      </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider };