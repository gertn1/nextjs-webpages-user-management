import styled from "styled-components";

export const IconWrapper = styled.div<{ $isOpen: boolean }>`
  left: ${(props) => (props.$isOpen ? "225px" : "37px")};
  position: fixed;
  display: block;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1001;
  cursor: pointer;
  padding: 10px;
  transition: left 0.18s ease-in-out;
`;
