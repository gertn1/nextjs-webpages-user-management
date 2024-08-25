import React, { FC } from "react";
import styled from "styled-components";

interface PageHomeProps {
  isOpen: boolean;
}

const StylePageHome = styled.div<{ $isOpen: boolean }>`
  margin-left: ${({ $isOpen }) => ($isOpen ? "250px" : "60px")};
  padding: 30px;
  transition: margin-left 0.3s ease;
`;

const PageHome: FC<PageHomeProps> = ({ isOpen }) => {
  return (
    <StylePageHome $isOpen={isOpen}>
      <h1>Você está na página inicial</h1>
    </StylePageHome>
  );
};

export default PageHome;
