import React, { useState } from "react";
import Navbar from "@/components/Navbar/NavBar";
import { Sidebar } from "../components/Sidebar";
import styled from "styled-components";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

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
    return null;
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
