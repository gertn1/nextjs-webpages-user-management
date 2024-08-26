import React, { useState } from "react";
import { useRouter } from "next/router";
import { logout } from "@/pages/api/auth/authService";
import styled from "styled-components";
import CurrentUserFetcher from "@/token/token";
import { DropdownMenu, LogoContainer, TopBar, UserContainer } from "./styles";
import Button from "../Button";
import Image from "next/image";
import { FaSignOutAlt } from "react-icons/fa";

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
      <LogoContainer onClick={toggleMenu}>
        <Image src="/next.png" alt="Description" width={100} height={100} />
        <DropdownMenu isOpen={menuOpen}>
          <Button
            onClick={handleLogout}
            text="Sair"
            padding="5px 12px"
          ></Button>
        </DropdownMenu>
      </LogoContainer>
      <UserContainer>
        <CurrentUserFetcher />
      </UserContainer>
    </TopBar>
  );
};

export default Navbar;
