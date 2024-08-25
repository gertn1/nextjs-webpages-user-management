import { FC } from "react";
import { IoArrowForward } from "react-icons/io5";
import Link from "next/link";
import { Label, IconWrapper, ItemsContainer } from "./styles";
import { ItemsProps } from "@/@types/SidebarProps/ItemsProps";

const SidebarItems: FC<ItemsProps> = ({ icon, label, url, isOpen }) => {
  return (
    <Link href={url} passHref>
      <ItemsContainer>
        <IconWrapper>
          <IoArrowForward />
        </IconWrapper>
        <Label $isOpen={isOpen}>{label}</Label>
      </ItemsContainer>
    </Link>
  );
};

export default SidebarItems;
