import React from "react";
import { useRouter } from "next/router";

import Button from "../Button";
import { logout } from "@/pages/api/auth/authService";

const Navbar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login/login");
  };

  return (
    <nav>
      <div>
        <h1>Bem-vindo ao sistema</h1>
        <p>Você não está logado</p>
        <Button onClick={handleLogout}>Sair</Button>
      </div>
    </nav>
  );
};

export default Navbar;
