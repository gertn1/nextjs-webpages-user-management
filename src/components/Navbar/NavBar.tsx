// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import { logout } from "@/pages/api/auth/authService";
// import { DropdownMenu, LogoContainer, TopBar, UserContainer } from "./styles";
// import Button from "../Button";
// import Image from "next/image";

// import CurrentUserFetcher from "@/token/CurrentUserFetcher";
// import { getCookie } from "cookies-next";

// const Navbar: React.FC = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

//   const handleLogout = () => {
//     logout();
//     window.location.reload();
//   };

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   useEffect(() => {
//     const token = getCookie("authToken");

//     if (!token) {
//       router.push("/dashboard");
//     }
//   }, [router]);

//   console.log("navbar");
//   return (
//     <TopBar>
//       <LogoContainer onClick={toggleMenu}>
//         <Image src="/next.png" alt="Description" width={100} height={100} />
//         <DropdownMenu isOpen={menuOpen}>
//           {isAuthenticated && (
//             <div>
//               <Button
//                 onClick={handleLogout}
//                 text="Sair"
//                 padding="3px 8px"
//                 backgroundColor="gray"
//               />
//             </div>
//           )}
//         </DropdownMenu>
//       </LogoContainer>
//       <UserContainer>
//         <CurrentUserFetcher setIsAuthenticated={setIsAuthenticated} />
//         {!isAuthenticated && (
//           <Button
//             onClick={() => router.push("/login")}
//             text="Entrar"
//             padding="5px 12px"
//           />
//         )}
//       </UserContainer>
//     </TopBar>
//   );
// };

// export default Navbar;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { logout } from "@/pages/api/auth/authService";
import { DropdownMenu, LogoContainer, TopBar, UserContainer } from "./styles";
import Button from "../Button";
import Image from "next/image";

import CurrentUserFetcher from "@/token/CurrentUserFetcher";
import { getCookie } from "cookies-next";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true); // Estado para indicar se a verificação de autenticação está em progresso
  const router = useRouter();

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const token = getCookie("authToken");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push("/dashboard");
    }
    setLoading(false); // A verificação de autenticação foi concluída
  }, [router]);

  if (loading) {
    return null; // Ou você pode retornar um spinner de carregamento
  }

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
