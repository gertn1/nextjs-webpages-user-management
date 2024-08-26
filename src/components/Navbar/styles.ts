import styled from "styled-components";

export const TopBar = styled.nav`
  background-color: rgb(40, 44, 52);
  height: 90px;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  position: relative;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const LogoContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    height: 100px;
    width: auto;
  }

  @media (max-width: 768px) {
    img {
      height: 30px;
    }
  }
`;

export const DropdownMenu = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
  text-align: right;
`;
