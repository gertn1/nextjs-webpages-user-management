import React, { useState, useEffect } from "react";

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
};

const CurrentUserFetcher: React.FC = () => {
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const token = getCookie("authToken"); // Use o token do cookie
        if (!token) {
          throw new Error("Token not found");
        }

        const response = await fetch(
          "https://localhost:7066/api/User/nome-usuario",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Tratar a resposta como texto, pois é uma string simples
        const userName = await response.text();
        setCurrentUserName(userName); // Armazena o nome do usuário
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <p>Bem-vindo, {currentUserName || "Usuário"}</p>;
};

export default CurrentUserFetcher;
