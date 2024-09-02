import React, { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useAuth } from "@/context/AuthContext"; // Importe o useAuth
import {
  ErrorMessage,
  LoginButton,
  LoginContainer,
  LoginInput,
} from "./styles";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(
        "Falha ao fazer login. Verifique suas credenciais e tente novamente."
      );
    }
  };

  return (
    <LoginContainer>
      <h2>Login</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleSubmit}>
        <LoginInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <LoginInput
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <LoginButton type="submit">Entrar</LoginButton>
        germano@gmail.com
      </form>
    </LoginContainer>
  );
};

export default Login;
