import { FC } from "react";
// import { menuItems } from "../MenuSidebar/ItensSidebar";
// import SidebarItems from "../SidebarItems/SidebarItems";
// import SidebarIcon from "../SidebarIcon/SidebarIcon";

import { SidebarContainer, SidebarMenuItems } from "./styles";
import { SidebarIconProps } from "@/@types/SidebarProps/SidebarIconProps";
import SidebarIcon from "./SidebarIcon/SidebarIcon";
import { menuItems } from "./MenuSidebar/ItensSidebar";
import SidebarItems from "./SidebarItems/SidebarItems";

export const Sidebar: FC<SidebarIconProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <SidebarContainer $isOpen={isOpen}>
      <SidebarIcon isOpen={isOpen} toggleSidebar={toggleSidebar} />
      {menuItems.map(({ label, url, icon }) => (
        <SidebarMenuItems key={url}>
          <SidebarItems label={label} icon={icon} url={url} isOpen={isOpen} />
        </SidebarMenuItems>
      ))}
    </SidebarContainer>
  );
};
