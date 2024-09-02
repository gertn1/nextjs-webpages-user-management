import { useRouter } from "next/router";
import React, { createContext, useContext, useState, useEffect } from "react";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import {
  login as loginService,
  LoginResponse,
} from "../pages/api/auth/authService";

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
    console.log("Stored token:", storedToken); //token
    if (storedToken) {
      setToken(storedToken as string);
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const data: LoginResponse = await loginService(email, password); // Chama o loginService corretamente
      setCookie("authToken", data.token, { maxAge: 600, path: "/" });
      setToken(data.token);
    } catch (error) {
      console.error("Erro durante o login:", error);
      throw new Error("Falha ao fazer login.");
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
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
