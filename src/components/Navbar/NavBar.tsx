import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { logout } from "@/pages/api/auth/authService";
import { DropdownMenu, LogoContainer, TopBar, UserContainer } from "./styles";
import Button from "../Button";
import Image from "next/image";

import CurrentUserFetcher from "@/token/CurrentUserFetcher";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const handleLogout = () => {
    logout();
    router.push("/dashboard");
    window.location.reload();
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
              <Link href="/pageProfil" passHref>
                <Button
                  text="Perfil"
                  padding="3px 8px"
                  backgroundColor="gray"
                />
              </Link>
            </div>
          )}
        </DropdownMenu>
      </LogoContainer>
      <UserContainer>
        <CurrentUserFetcher setIsAuthenticated={setIsAuthenticated} />
        {!isAuthenticated && (
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
