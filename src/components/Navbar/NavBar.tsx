import React, { useState } from "react";
import { useRouter } from "next/router";
import { DropdownMenu, LogoContainer, TopBar, UserContainer } from "./styles";
import Button from "../Button";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext"; // Importando o useAuth

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.reload();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <TopBar>
      <LogoContainer onClick={toggleMenu}>
        <Image src="/next.png" alt="Description" width={100} height={100} />
        <DropdownMenu isOpen={menuOpen}>
          {isAuthenticated && (
            <div>
              <Button
                onClick={handleLogout}
                text="Sair"
                padding="3px 8px"
                backgroundColor="gray"
              />
            </div>
          )}
        </DropdownMenu>
      </LogoContainer>
      <UserContainer>
        {isAuthenticated ? (
          <Button
            onClick={handleLogout}
            text="Sair"
            padding="5px 12px"
            backgroundColor="gray"
          />
        ) : (
          <Button
            onClick={() => router.push("/login")}
            text="Entrar"
            padding="5px 12px"
          />
        )}
      </UserContainer>
    </TopBar>
  );
};

export default Navbar;
