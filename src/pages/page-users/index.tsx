import React, { FC } from "react";
import UserList from "@/components/UserList/UserList";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useAuth } from "@/context/AuthContext";
import { withAuth } from "@/utils/auth";

const StylePageUsers = styled.div``;

const PageUsers: FC = () => {
  const { isAuthenticated } = useAuth();

  console.log("Estado de autenticação em PageUsers:", isAuthenticated);

  return (
    <StylePageUsers>
      {isAuthenticated ? <UserList /> : <p>Usuário não autenticado</p>}
    </StylePageUsers>
  );
};

export const getServerSideProps = withAuth(async (ctx) => {
  return {
    props: {
      isOpen: true,
    },
  };
});

export default PageUsers;
