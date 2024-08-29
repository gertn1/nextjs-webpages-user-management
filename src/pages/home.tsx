import React, { FC } from "react";
import styled from "styled-components";

interface HomeProps {
  isOpen: boolean;
}

const StyleHome = styled.div<{ $isOpen: boolean }>`
  margin-left: ${({ $isOpen }) => ($isOpen ? "250px" : "60px")};
  padding: 30px;
  transition: margin-left 0.3s ease;
`;

const Home: FC<HomeProps> = ({ isOpen }) => {
  return (
    <StyleHome $isOpen={isOpen}>
      <h1>Você está na página inicial2222</h1>
    </StyleHome>
  );
};

export default Home;
