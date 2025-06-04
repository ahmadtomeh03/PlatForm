import React, { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");
    if (token && storedUsername && storedRole) {
      setIsLogin(true);
      setUsername(storedUsername);
      setRole(storedRole);
    }
  }, []);

  const login = (token, username, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
    setIsLogin(true);
    setUsername(username);
    setRole(role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setIsLogin(false);
    setUsername(null);
    setRole(null);
  };

  return (
    <UserContext.Provider value={{ isLogin, username, role, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
