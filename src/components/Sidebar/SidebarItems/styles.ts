import Link from "next/link";
import styled from "styled-components";

export const ItemsContainer = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  padding: 10px 20px;
  margin: 3px;

  &:hover {
    background-color: #575757;
  }
`;

export const Label = styled.span<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? "inline" : "none")};
`;

export const IconWrapper = styled.span`
  display: flex;
  margin-right: 5px;
`;
