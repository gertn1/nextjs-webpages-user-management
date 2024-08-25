import React, { useState } from "react";
import Navbar from "@/components/Navbar/NavBar";
import { Sidebar } from "../Sidebar";
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
`;

const MainContent = styled.main<{ isSidebarOpen: boolean }>`
  flex-grow: 1;
  margin-left: ${({ isSidebarOpen }) => (isSidebarOpen ? "250px" : "60px")};
  transition: margin-left 0.3s ease;
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Navbar />
      <LayoutContainer>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <MainContent isSidebarOpen={isSidebarOpen}>{children}</MainContent>
      </LayoutContainer>
    </div>
  );
};

export default Layout;
