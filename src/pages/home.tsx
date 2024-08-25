import React, { FC } from "react";
import UserList from "@/components/UserList/UserList";
import styled from "styled-components";

interface HomeProps {
  isOpen: boolean;
}

const StyleHome = styled.div<{ $isOpen: boolean }>`
  transition: margin-left 0.3s ease;
  margin-left: ${({ $isOpen }) => ($isOpen ? "250px" : "60px")};
`;

const Home: FC<HomeProps> = ({ isOpen }) => {
  return (
    <StyleHome $isOpen={isOpen}>
      <UserList />
    </StyleHome>
  );
};

export default Home;
