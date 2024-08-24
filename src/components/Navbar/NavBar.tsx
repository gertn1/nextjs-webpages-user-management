import React from "react";
import { useRouter } from "next/router";

import Button from "../Button";
import { logout } from "@/pages/api/auth/authService";
import CurrentUser from "@/token/token";
import CurrentUserFetcher from "@/token/token";

const Navbar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <nav>
      <div>
        <h1>Bem-vindo ao sistema</h1>
        <p>Você não está logado</p>
        <CurrentUserFetcher />
        <Button onClick={handleLogout}>Sair</Button>
      </div>
    </nav>
  );
};

export default Navbar;
