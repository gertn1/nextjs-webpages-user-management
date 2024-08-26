import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { apiService } from "@/pages/api/Service/apiService";

const StyleProfileInfo = styled.div`
  font-weight: bold;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  display: flex;
  justify-content: center;
  font-size: 1rem;
`;

const StyleProfileText = styled.div`
  display: flex;
  font-size: 12px;
  justify-content: center;
  color: #a9a8a8;
  font-weight: bold;
  padding: 0.2rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

const CurrentUserFetcher: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    role: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const data = await apiService.get("/Some/current-user");
        setCurrentUser({ name: data.name, role: data.role });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <StyleProfileText>Usuário</StyleProfileText>
      <StyleProfileInfo>{currentUser?.name}</StyleProfileInfo>
      <StyleProfileText>Perfil</StyleProfileText>
      <StyleProfileInfo>{currentUser?.role}</StyleProfileInfo>
    </div>
  );
};

export default CurrentUserFetcher;
