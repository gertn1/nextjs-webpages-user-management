import React, { useState } from "react";
import { useRouter } from "next/router";
import { logout } from "@/pages/api/auth/authService";
import styled from "styled-components";
import CurrentUserFetcher from "@/token/token";
import { DropdownMenu, LogoContainer, TopBar } from "./styles";
import Button from "../Button";
import Image from "next/image";

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
        <Image src="/next.png" alt="Description" width={50} height={50} />
        <DropdownMenu isOpen={menuOpen}>
          <Button onClick={handleLogout}>Sair</Button>
        </DropdownMenu>
      </LogoContainer>
      <CurrentUserFetcher />
    </TopBar>
  );
};

export default Navbar;
