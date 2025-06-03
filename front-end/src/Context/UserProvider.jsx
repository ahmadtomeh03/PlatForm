import React, { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const login = () => setIsLogin(true);
  const logout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
  };

  return (
    <UserContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
