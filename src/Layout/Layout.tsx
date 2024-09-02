// import React, { useState, useEffect } from "react";
// import Navbar from "@/components/Navbar/NavBar";
// import { Sidebar } from "../components/Sidebar";
// import styled from "styled-components";
// import { useRouter } from "next/router";
// import { usePathname } from "next/navigation";
// import { getCookie } from "cookies-next";

// const LayoutContainer = styled.div`
//   display: flex;
// `;

// const MainContent = styled.main<{ isSidebarOpen: boolean; noSidebar: boolean }>`
//   flex-grow: 1;
//   margin-left: ${({ isSidebarOpen, noSidebar }) =>
//     noSidebar ? "0" : isSidebarOpen ? "250px" : "60px"};
//   transition: margin-left 0.3s ease;
// `;

// const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();
//   const pathname = usePathname();

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   useEffect(() => {
//     const token = getCookie("authToken");

//     if (!token) {
//       if (pathname.startsWith("/protected") || pathname === "/") {
//         router.push("/dashboard");
//       }
//     } else {
//       setIsAuthenticated(true);
//     }
//   }, [pathname]);

//   if (
//     !isAuthenticated &&
//     (pathname.startsWith("/protected") || pathname === "/")
//   ) {
//     return null; // Evita renderizar qualquer conteúdo enquanto não estiver autenticado
//   }

//   const noSidebar = pathname === "/";

//   return (
//     <div>
//       <Navbar />
//       <LayoutContainer>
//         {isAuthenticated && !noSidebar && (
//           <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//         )}
//         <MainContent isSidebarOpen={isSidebarOpen} noSidebar={noSidebar}>
//           {children}
//         </MainContent>
//       </LayoutContainer>
//     </div>
//   );
// };

// export default Layout;

import React, { useState } from "react";
import Navbar from "@/components/Navbar/NavBar";
import { Sidebar } from "../components/Sidebar";
import styled from "styled-components";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Importe o useAuth

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
  const { isAuthenticated } = useAuth(); // Utilize o hook useAuth
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Use o hook useAuth para determinar a autenticação e redirecionamento
  React.useEffect(() => {
    if (!isAuthenticated) {
      if (pathname.startsWith("/protected") || pathname === "/") {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, pathname, router]);

  if (
    !isAuthenticated &&
    (pathname.startsWith("/protected") || pathname === "/")
  ) {
    return null; // Evita renderizar qualquer conteúdo enquanto não estiver autenticado
  }

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
