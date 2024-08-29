// // import React, { useState, useEffect } from "react";
// // import styled from "styled-components";
// // import { apiService } from "@/pages/api/Service/apiService";

// // const StyleProfileInfo = styled.div`
// //   font-weight: bold;
// //   font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
// //   display: flex;
// //   justify-content: center;
// //   font-size: 1rem;
// // `;

// // const StyleProfileText = styled.div`
// //   display: flex;
// //   font-size: 12px;
// //   justify-content: center;
// //   color: #a9a8a8;
// //   font-weight: bold;
// //   padding: 0.2rem;
// //   font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
// // `;

// // const CurrentUserFetcher: React.FC = () => {
// //   const [currentUser, setCurrentUser] = useState<{
// //     name: string;
// //     role: string;
// //   } | null>(null);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     const fetchCurrentUser = async () => {
// //       try {
// //         const data = await apiService.get("/Some/current-user");
// //         setCurrentUser({ name: data.name, role: data.role });
// //       } catch (error: any) {
// //         setError(error.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchCurrentUser();
// //   }, []);

// //   if (loading) {
// //     return <p>Loading...</p>;
// //   }

// //   if (error) {
// //     return <p>Error: {error}</p>;
// //   }

// //   return (
// //     <div>
// //       <StyleProfileText>Usuário</StyleProfileText>
// //       <StyleProfileInfo>{currentUser?.name}</StyleProfileInfo>
// //       <StyleProfileText>Perfil</StyleProfileText>
// //       <StyleProfileInfo>{currentUser?.role}</StyleProfileInfo>
// //     </div>
// //   );
// // };

// // export default CurrentUserFetcher;

// import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
// import styled from "styled-components";
// import { apiService } from "@/pages/api/Service/apiService";

// // Estilização dos componentes
// const StyleProfileInfo = styled.div`
//   font-weight: bold;
//   font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
//   display: flex;
//   justify-content: center;
//   font-size: 1rem;
// `;

// const StyleProfileText = styled.div`
//   display: flex;
//   font-size: 12px;
//   justify-content: center;
//   color: #a9a8a8;
//   font-weight: bold;
//   padding: 0.2rem;
//   font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
// `;

// interface CurrentUserFetcherProps {
//   setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
// }

// const CurrentUserFetcher: React.FC<CurrentUserFetcherProps> = ({
//   setIsAuthenticated,
// }) => {
//   const [currentUser, setCurrentUser] = useState<{
//     name: string;
//     role: string;
//   } | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const data = await apiService.get("/Some/current-user");
//         setCurrentUser({ name: data.name, role: data.role });
//         setIsAuthenticated(true);
//       } catch (error: any) {
//         setError(error.message);
//         setIsAuthenticated(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCurrentUser();
//   }, [setIsAuthenticated]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error}</p>;
//   }

//   return (
//     <div>
//       <StyleProfileText>Usuário</StyleProfileText>
//       <StyleProfileInfo>{currentUser?.name}</StyleProfileInfo>
//       <StyleProfileText>Perfil</StyleProfileText>
//       <StyleProfileInfo>{currentUser?.role}</StyleProfileInfo>
//     </div>
//   );
// };

// export default CurrentUserFetcher;

import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { apiService } from "@/pages/api/Service/apiService";

// Estilização dos componentes
const StyleProfileInfo = styled.div`
  font-weight: bold;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  display: flex;
  justify-content: center;
  font-size: 1rem;
`;

const StyleProfileText = styled.div`
  display: flex;
  font-size: 12px;
  justify-content: center;
  color: #a9a8a8;
  font-weight: bold;
  padding: 0.2rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
`;

interface CurrentUserFetcherProps {
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const CurrentUserFetcher: React.FC<CurrentUserFetcherProps> = ({
  setIsAuthenticated,
}) => {
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    role: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticatedState] = useState<boolean>(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const data = await apiService.get("/Some/current-user");
        setCurrentUser({ name: data.name, role: data.role });
        setIsAuthenticated(true);
        setIsAuthenticatedState(true);
      } catch (error: any) {
        setError(error.message);
        setIsAuthenticated(false);
        setIsAuthenticatedState(false);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [setIsAuthenticated]);

  if (!isAuthenticated) {
    return null; // Não renderiza o componente se o usuário não estiver autenticado
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <StyleProfileText>Usuário</StyleProfileText>
      <StyleProfileInfo>{currentUser?.name}</StyleProfileInfo>
      <StyleProfileText>Perfil</StyleProfileText>
      <StyleProfileInfo>{currentUser?.role}</StyleProfileInfo>
    </div>
  );
};

export default CurrentUserFetcher;
