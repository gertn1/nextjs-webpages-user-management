import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar/NavBar";
import { Sidebar } from "../Sidebar";
import styled from "styled-components";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next";

const LayoutContainer = styled.div`
  display: flex;
`;

const MainContent = styled.main<{ isSidebarOpen: boolean; noSidebar: boolean }>`
  flex-grow: 1;
  margin-left: ${({ isSidebarOpen, noSidebar }) =>
    noSidebar ? "0" : isSidebarOpen ? "250px" : "60px"};
  transition: margin-left 0.3s ease;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Verificação de autenticação usando o cookie
    const checkAuth = () => {
      const token = getCookie("authToken"); // Obtém o token do cookie
      return token !== undefined && token !== null;
    };

    if (!checkAuth()) {
      // Se o usuário não estiver autenticado, redirecione para a página de login
      if (pathname.startsWith("/protected") || pathname === "/") {
        router.push("/dashboard");
      }
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  // Se o usuário não estiver autenticado, não renderiza o conteúdo protegido
  if (
    !isAuthenticated &&
    (pathname.startsWith("/protected") || pathname === "/")
  ) {
    return null; // ou você pode mostrar uma tela de carregamento ou algo semelhante
  }

  // Verifica se estamos na rota /dashboard, para não exibir o Sidebar nessa rota
  const noSidebar = pathname === "/";

  return (
    <div>
      <Navbar />
      <LayoutContainer>
        {isAuthenticated && !noSidebar && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}
        <MainContent isSidebarOpen={isSidebarOpen} noSidebar={noSidebar}>
          {children}
        </MainContent>
      </LayoutContainer>
    </div>
  );
};

export default Layout;
