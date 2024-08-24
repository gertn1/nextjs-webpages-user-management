// import Navbar from "@/components/Navbar/NavBar";
// import CurrentUser from "@/token/token";
// import React, { useState } from "react";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   // Adicione outros campos que sua API retorna
// }

// const UserList: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchUsers = async () => {
//     const token = localStorage.getItem("authToken"); // Usando a chave correta

//     if (!token) {
//       setError("Token not found. Please log in.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("https://localhost:7066/api/User/ListUser", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: ` ${token}`, // Usando o token correto
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`Error: ${response.statusText}`);
//       }

//       const data = await response.json();

//       if (data.status && Array.isArray(data.dados)) {
//         setUsers(data.dados);
//       } else {
//         throw new Error("Unexpected response format");
//       }

//       setLoading(false);
//     } catch (error: any) {
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <CurrentUser />
//       <h1>User List</h1>
//       <button onClick={fetchUsers} disabled={loading}>
//         {loading ? "Loading..." : "Fetch Users"}
//       </button>
//       {error && <p>Error: {error}</p>}
//       <ul>
//         {users.map((user) => (
//           <li key={user.id}>
//             {user.name} - {user.email}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;

import Navbar from "@/components/Navbar/NavBar";
import CurrentUser from "@/token/token";
import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  // Adicione outros campos que sua API retorna
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Função para obter o valor do cookie
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  const fetchUsers = async () => {
    const token = getCookie("authToken"); // Usando a função para obter o cookie

    if (!token) {
      setError("Token not found. Please log in.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://localhost:7066/api/User/ListUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Usando o token correto
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.status && Array.isArray(data.dados)) {
        setUsers(data.dados);
      } else {
        throw new Error("Unexpected response format");
      }

      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <CurrentUser />
      <h1>User List</h1>
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? "Loading..." : "Fetch Users"}
      </button>
      {error && <p>Error: {error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
