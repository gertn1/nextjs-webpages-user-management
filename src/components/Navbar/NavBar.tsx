// import React from "react";
// import { useRouter } from "next/router";
// import Button from "../Button";
// import { logout } from "@/pages/api/auth/authService";
// import CurrentUserInfo from "@/token/token";
// import styled from "styled-components";
// import next from "../../../public/next.png";

// const TopBar = styled.nav`
//   background-color: #282c34;
//   height: 60px;
//   color: white;
//   padding: 10px 20px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
//   box-sizing: border-box;

//   @media (max-width: 768px) {
//     padding: 10px;
//   }
// `;
// const Logo = styled.div`
//   font-size: 32px;
//   text-align: center;
//   width: 100%;

//   img {
//     height: 50px;
//     width: auto;
//   }

//   @media (max-width: 768px) {
//     font-size: 20px;
//     img {
//       height: 30px;
//     }
//   }
// `;

// const Navbar: React.FC = () => {
//   const router = useRouter();

//   const handleLogout = () => {
//     logout();
//     router.push("/login");
//   };

//   return (
//     <TopBar>
//       <Logo>
//         <img src="/next.png" alt="Logo" />
//       </Logo>
//       <Button onClick={handleLogout}>Sair</Button>
//       <CurrentUserInfo />
//     </TopBar>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "../Button";
import { logout } from "@/pages/api/auth/authService";
import CurrentUserInfo from "@/token/token";
import styled from "styled-components";
import CurrentUserFetcher from "@/token/token";

const TopBar = styled.nav`
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

const LogoContainer = styled.div`
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

const DropdownMenu = styled.div<{ isOpen: boolean }>`
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

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <TopBar>
      <div>{/* Espere por aqui outros conteúdos se necessário */}</div>
      <LogoContainer onClick={toggleMenu}>
        <img src="/next.png" alt="Logo" />
        <DropdownMenu isOpen={menuOpen}>
          <Button onClick={handleLogout}>Sair</Button>
        </DropdownMenu>
      </LogoContainer>
      <CurrentUserFetcher />
    </TopBar>
  );
};

export default Navbar;
