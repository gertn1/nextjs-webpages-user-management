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
  position: relative;
  cursor: pointer;

  img {
    height: 40px;
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
  top: 60px;
  right: 0;
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;

  button {
    width: 100%;
    background: none;
    border: none;
    padding: 10px;
    text-align: left;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;
