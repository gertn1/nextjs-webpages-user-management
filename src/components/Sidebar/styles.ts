import styled from "styled-components";

export const SidebarContainer = styled.div<{ $isOpen: boolean }>`
  width: ${(props) => (props.$isOpen ? "250px" : "60px")};
  height: 100vh;
  transition: width 0.3s;
  overflow-x: hidden;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #282c34;
  color: white;
  padding-top: 50px;
`;

export const SidebarMenuItems = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.3rem;
`;
