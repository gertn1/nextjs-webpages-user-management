import React, { createContext, useContext, useState, useEffect } from "react";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { LoginResponse } from "@/pages/api/auth/authService";

interface AuthContextProps {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = getCookie("authToken");
    if (storedToken) {
      setToken(storedToken as string);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch("https://localhost:7066/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to login: ${errorText}`);
      }

      const data: LoginResponse = await response.json();
      setCookie("authToken", data.token, { maxAge: 600, path: "/" });
      setToken(data.token);
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("Login failed");
    }
  };

  const logout = (): void => {
    deleteCookie("authToken", { path: "/" });
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
