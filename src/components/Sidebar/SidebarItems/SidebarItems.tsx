// import { FC } from "react";
// import { IoArrowForward } from "react-icons/io5";
// import Link from "next/link";
// import { Label, IconWrapper, ItemsContainer } from "./styles";
// import { ItemsProps } from "@/@types/SidebarProps/ItemsProps";
// import { IonIcon } from "@ionic/react";
// const IonIcon = dynamic(
//   () => import("@ionic/react").then((mod) => mod.IonIcon),
//   { ssr: false }
// );

// const SidebarItems: FC<ItemsProps> = ({ icon, label, url, isOpen }) => {
//   return (
//     <Link href={url} passHref>
//       <ItemsContainer>
//         <IconWrapper>
//           {/* <IoArrowForward /> */}
//           <IonIcon icon={icon} />
//         </IconWrapper>
//         <Label $isOpen={isOpen}>{label}</Label>
//       </ItemsContainer>
//     </Link>
//   );
// };

// export default SidebarItems;

import { FC } from "react";
import { IoArrowForward } from "react-icons/io5";
import Link from "next/link";
import { Label, IconWrapper, ItemsContainer } from "./styles";
import { ItemsProps } from "@/@types/SidebarProps/ItemsProps";
import dynamic from "next/dynamic";

const IonIcon = dynamic(
  () => import("@ionic/react").then((mod) => mod.IonIcon),
  { ssr: false }
);

const SidebarItems: FC<ItemsProps> = ({ icon, label, url, isOpen }) => {
  return (
    <Link href={url} passHref>
      <ItemsContainer>
        <IconWrapper>
          <IonIcon icon={icon} />
        </IconWrapper>
        <Label $isOpen={isOpen}>{label}</Label>
      </ItemsContainer>
    </Link>
  );
};

export default SidebarItems;
