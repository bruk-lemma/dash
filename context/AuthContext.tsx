"use client";

import { createContext, useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

interface User {
  id: number;
  name: string;
  email: string;
  userType: "REGION" | "STATION" | "SCHOOL";
  privileges: string[];
  details?: any;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      try {
        const decoded = jwt.decode(token) as User;
        setUser(decoded);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Token decode failed", err);
        setUser(null);
        setIsAuthenticated(false);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
