import React, { FC } from "react";
import UserList from "@/components/UserList/UserList";
import styled from "styled-components";

interface PageUsersProps {
  isOpen: boolean;
}

const StylePageUsers = styled.div<{ $isOpen: boolean }>`
  transition: margin-left 0.3s ease;
  margin-left: ${({ $isOpen }) => ($isOpen ? "250px" : "60px")};
`;

const PageUsers: FC<PageUsersProps> = ({ isOpen }) => {
  return (
    <StylePageUsers $isOpen={isOpen}>
      <UserList />
    </StylePageUsers>
  );
};
export default PageUsers;
