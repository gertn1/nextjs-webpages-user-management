// // import React, { useState, useEffect } from "react";
// // import styled from "styled-components";
// // import { apiService } from "@/pages/api/Service/apiService";
// // import { Container, Form, Input, List, ListItem, Select } from "./styles";
// // import Button from "../Button";

// // interface User {
// //   id: number;
// //   name: string;
// //   email: string;
// //   roleId: number;
// // }

// // const UserList: React.FC = () => {
// //   const [users, setUsers] = useState<User[]>([]);
// //   const [loading, setLoading] = useState<boolean>(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [editingUser, setEditingUser] = useState<User | null>(null);
// //   const [creatingUser, setCreatingUser] = useState<User | null>(null);
// //   const [isCreating, setIsCreating] = useState<boolean>(false); // Estado para controlar a exibição do formulário de criação
// //   const [refresh, setRefresh] = useState<boolean>(false); // Estado para controle de refresh

// //   useEffect(() => {
// //     fetchUsers();
// //   }, [refresh]); // Executa fetchUsers sempre que `refresh` mudar

// //   const fetchUsers = async () => {
// //     setLoading(true);
// //     setError(null);

// //     try {
// //       const data = await apiService.get("/User/ListUser");
// //       if (data.status && Array.isArray(data.dados)) {
// //         setUsers(data.dados);
// //       } else {
// //         throw new Error("Unexpected response format");
// //       }
// //     } catch (error: any) {
// //       setError(error.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleCreateUser = async () => {
// //     try {
// //       if (creatingUser) {
// //         await apiService.post("/User/CreateUser", creatingUser);
// //         setCreatingUser(null); // Reseta o estado após a criação
// //         setIsCreating(false); // Esconde o formulário de criação após criar o usuário
// //         setRefresh(!refresh); // Atualiza o estado de `refresh` para disparar o useEffect
// //       }
// //     } catch (error) {
// //       console.error("Failed to create user", error);
// //     }
// //   };

// //   const handleEditUser = (user: User) => {
// //     setEditingUser(user);
// //   };

// //   const handleUpdateUser = async () => {
// //     try {
// //       if (editingUser) {
// //         await apiService.put(`/User/EditUser/${editingUser.id}`, editingUser);
// //         setEditingUser(null);
// //         setRefresh(!refresh);
// //       }
// //     } catch (error) {
// //       console.error("Failed to update user", error);
// //     }
// //   };

// //   const handleDeleteUser = async (userId: number) => {
// //     try {
// //       await apiService.delete(`/User/RemoveUser/${userId}`);
// //       setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
// //     } catch (error) {
// //       console.error("Failed to delete user", error);
// //     }
// //   };

// //   const startCreatingUser = () => {
// //     setCreatingUser({ id: 0, name: "", email: "", roleId: 2 }); // Inicializa o estado de criação de usuário
// //     setIsCreating(true); // Exibe o formulário de criação
// //   };

// //   const cancelCreateUser = () => {
// //     setCreatingUser(null);
// //     setIsCreating(false);
// //   };

// //   const getRoleLabel = (roleId: number) => {
// //     switch (roleId) {
// //       case 1:
// //         return "Admin";
// //       case 2:
// //         return "User";
// //       default:
// //         return "";
// //     }
// //   };

// //   return (
// //     <Container>
// //       <h1>User List</h1>
// //       {!isCreating && (
// //         <Button onClick={startCreatingUser}>New User</Button> // Botão para iniciar a criação de um novo usuário
// //       )}

// //       {isCreating && creatingUser && (
// //         <Form>
// //           <Input
// //             type="text"
// //             placeholder="Name"
// //             value={creatingUser.name}
// //             onChange={(e) =>
// //               setCreatingUser({ ...creatingUser, name: e.target.value })
// //             }
// //           />
// //           <Input
// //             type="email"
// //             placeholder="Email"
// //             value={creatingUser.email}
// //             onChange={(e) =>
// //               setCreatingUser({ ...creatingUser, email: e.target.value })
// //             }
// //           />
// //           <Select
// //             value={creatingUser.roleId}
// //             onChange={(e) =>
// //               setCreatingUser({
// //                 ...creatingUser,
// //                 roleId: Number(e.target.value),
// //               })
// //             }
// //           >
// //             <option value={2}>User</option>
// //             <option value={1}>Admin</option>
// //           </Select>
// //           <Button onClick={handleCreateUser}>Create User</Button>
// //           <Button onClick={cancelCreateUser}>Cancel</Button>
// //         </Form>
// //       )}

// //       {editingUser && (
// //         <Form>
// //           <Input
// //             type="text"
// //             placeholder="Name"
// //             value={editingUser.name}
// //             onChange={(e) =>
// //               setEditingUser({ ...editingUser, name: e.target.value })
// //             }
// //           />
// //           <Input
// //             type="email"
// //             placeholder="Email"
// //             value={editingUser.email}
// //             onChange={(e) =>
// //               setEditingUser({ ...editingUser, email: e.target.value })
// //             }
// //           />
// //           <Select
// //             value={editingUser.roleId}
// //             onChange={(e) =>
// //               setEditingUser({ ...editingUser, roleId: Number(e.target.value) })
// //             }
// //           >
// //             <option value={2}>User</option>
// //             <option value={1}>Admin</option>
// //           </Select>
// //           <Button onClick={handleUpdateUser}>Update User</Button>
// //           <Button onClick={() => setEditingUser(null)}>Cancel</Button>
// //         </Form>
// //       )}

// //       <List>
// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : error ? (
// //           <p>Error: {error}</p>
// //         ) : (
// //           users.map((user) => (
// //             <ListItem key={user.id}>
// //               <span>{user.name}</span>
// //               <span>{user.email}</span>
// //               <span>{getRoleLabel(user.roleId)}</span>
// //               <Button onClick={() => handleEditUser(user)}>Edit</Button>
// //               <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
// //             </ListItem>
// //           ))
// //         )}
// //       </List>
// //     </Container>
// //   );
// // };

// // export default UserList;

// import React, { useState, useEffect } from "react";
// import { apiService } from "@/pages/api/Service/apiService";
// import { Container, Form, Input, List, ListItem, Select } from "./styles";
// import Button from "../Button";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   roleId: number;
// }

// const UserList: React.FC = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [editingUser, setEditingUser] = useState<User | null>(null);
//   const [creatingUser, setCreatingUser] = useState<User | null>(null);
//   const [isCreating, setIsCreating] = useState<boolean>(false); // Estado para controlar a exibição do formulário de criação
//   const [deletedUserId, setDeletedUserId] = useState<number | null>(null); // Estado para controlar o ID do usuário deletado

//   useEffect(() => {
//     fetchUsers();
//   }, [deletedUserId]); // Executa fetchUsers sempre que `deletedUserId` mudar

//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const data = await apiService.get("/User/ListUser");
//       if (data.status && Array.isArray(data.dados)) {
//         setUsers(data.dados);
//       } else {
//         throw new Error("Unexpected response format");
//       }
//     } catch (error: any) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateUser = async () => {
//     try {
//       if (creatingUser) {
//         await apiService.post("/User/CreateUser", creatingUser);
//         setCreatingUser(null); // Reseta o estado após a criação
//         setIsCreating(false); // Esconde o formulário de criação após criar o usuário
//         fetchUsers(); // Recarrega a lista de usuários
//       }
//     } catch (error) {
//       console.error("Failed to create user", error);
//     }
//   };

//   const handleEditUser = (user: User) => {
//     setEditingUser(user);
//   };

//   const handleUpdateUser = async () => {
//     try {
//       if (editingUser) {
//         await apiService.put(`/User/EditUser/${editingUser.id}`, editingUser);
//         setEditingUser(null);
//         fetchUsers(); // Recarrega a lista de usuários
//       }
//     } catch (error) {
//       console.error("Failed to update user", error);
//     }
//   };

//   const handleDeleteUser = async (userId: number) => {
//     try {
//       console.log("Deleting user with ID:", userId); // Confirmação de que a função foi chamada
//       await apiService.delete(`/User/RemoveUser/${userId}`);
//       setDeletedUserId(userId); // Atualiza o estado `deletedUserId` para disparar o useEffect e recarregar a lista
//     } catch (error) {
//       console.error("Failed to delete user", error);
//     }
//   };

//   const startCreatingUser = () => {
//     setCreatingUser({ id: 0, name: "", email: "", roleId: 2 }); // Inicializa o estado de criação de usuário
//     setIsCreating(true); // Exibe o formulário de criação
//   };

//   const cancelCreateUser = () => {
//     setCreatingUser(null);
//     setIsCreating(false);
//   };

//   const getRoleLabel = (roleId: number) => {
//     switch (roleId) {
//       case 1:
//         return "Admin";
//       case 2:
//         return "User";
//       default:
//         return "";
//     }
//   };

//   return (
//     <Container>
//       <h1>User List</h1>
//       {!isCreating && (
//         <Button onClick={startCreatingUser}>New User</Button> // Botão para iniciar a criação de um novo usuário
//       )}

//       {isCreating && creatingUser && (
//         <Form>
//           <Input
//             type="text"
//             placeholder="Name"
//             value={creatingUser.name}
//             onChange={(e) =>
//               setCreatingUser({ ...creatingUser, name: e.target.value })
//             }
//           />
//           <Input
//             type="email"
//             placeholder="Email"
//             value={creatingUser.email}
//             onChange={(e) =>
//               setCreatingUser({ ...creatingUser, email: e.target.value })
//             }
//           />
//           <Select
//             value={creatingUser.roleId}
//             onChange={(e) =>
//               setCreatingUser({
//                 ...creatingUser,
//                 roleId: Number(e.target.value),
//               })
//             }
//           >
//             <option value={2}>User</option>
//             <option value={1}>Admin</option>
//           </Select>
//           <Button onClick={handleCreateUser}>Create User</Button>
//           <Button onClick={cancelCreateUser}>Cancel</Button>
//         </Form>
//       )}

//       {editingUser && (
//         <Form>
//           <Input
//             type="text"
//             placeholder="Name"
//             value={editingUser.name}
//             onChange={(e) =>
//               setEditingUser({ ...editingUser, name: e.target.value })
//             }
//           />
//           <Input
//             type="email"
//             placeholder="Email"
//             value={editingUser.email}
//             onChange={(e) =>
//               setEditingUser({ ...editingUser, email: e.target.value })
//             }
//           />
//           <Select
//             value={editingUser.roleId}
//             onChange={(e) =>
//               setEditingUser({ ...editingUser, roleId: Number(e.target.value) })
//             }
//           >
//             <option value={2}>User</option>
//             <option value={1}>Admin</option>
//           </Select>
//           <Button onClick={handleUpdateUser}>Update User</Button>
//           <Button onClick={() => setEditingUser(null)}>Cancel</Button>
//         </Form>
//       )}

//       <List>
//         {loading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p>Error: {error}</p>
//         ) : (
//           users.map((user) => (
//             <ListItem key={user.id}>
//               <span>{user.name}</span>
//               <span>{user.email}</span>
//               <span>{getRoleLabel(user.roleId)}</span>
//               <Button onClick={() => handleEditUser(user)}>Edit</Button>
//               <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
//             </ListItem>
//           ))
//         )}
//       </List>
//     </Container>
//   );
// };

// export default UserList;

import React, { useState, useEffect } from "react";
import { apiService } from "@/pages/api/Service/apiService";
import { Container, Form, Input, List, ListItem, Select } from "./styles";
import Button from "../Button";

interface User {
  id: number;
  name: string;
  email: string;
  roleId: number;
  password?: string; // Campo de senha adicionado opcionalmente
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [creatingUser, setCreatingUser] = useState<User | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false); // Estado para controlar a exibição do formulário de criação
  const [deletedUserId, setDeletedUserId] = useState<number | null>(null); // Estado para controlar o ID do usuário deletado

  useEffect(() => {
    fetchUsers();
  }, [deletedUserId]); // Executa fetchUsers sempre que `deletedUserId` mudar

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await apiService.get("/User/ListUser");
      if (data.status && Array.isArray(data.dados)) {
        setUsers(data.dados);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    try {
      if (creatingUser) {
        await apiService.post("/User/CreateUser", creatingUser);
        setCreatingUser(null); // Reseta o estado após a criação
        setIsCreating(false); // Esconde o formulário de criação após criar o usuário
        fetchUsers(); // Recarrega a lista de usuários
      }
    } catch (error) {
      console.error("Failed to create user", error);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async () => {
    try {
      if (editingUser) {
        await apiService.put(`/User/EditUser/${editingUser.id}`, editingUser);
        setEditingUser(null);
        fetchUsers(); // Recarrega a lista de usuários
      }
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      console.log("Deleting user with ID:", userId); // Confirmação de que a função foi chamada
      await apiService.delete(`/User/RemoveUser/${userId}`);
      setDeletedUserId(userId); // Atualiza o estado `deletedUserId` para disparar o useEffect e recarregar a lista
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const startCreatingUser = () => {
    setCreatingUser({ id: 0, name: "", email: "", roleId: 2, password: "" }); // Inicializa o estado de criação de usuário com senha
    setIsCreating(true); // Exibe o formulário de criação
  };

  const cancelCreateUser = () => {
    setCreatingUser(null);
    setIsCreating(false);
  };

  const getRoleLabel = (roleId: number) => {
    switch (roleId) {
      case 1:
        return "Admin";
      case 2:
        return "User";
      default:
        return "";
    }
  };

  return (
    <Container>
      <h1>User List</h1>
      {!isCreating && (
        <Button onClick={startCreatingUser}>New User</Button> // Botão para iniciar a criação de um novo usuário
      )}

      {isCreating && creatingUser && (
        <Form>
          <Input
            type="text"
            placeholder="Name"
            value={creatingUser.name}
            onChange={(e) =>
              setCreatingUser({ ...creatingUser, name: e.target.value })
            }
          />
          <Input
            type="email"
            placeholder="Email"
            value={creatingUser.email}
            onChange={(e) =>
              setCreatingUser({ ...creatingUser, email: e.target.value })
            }
          />
          <Input
            type="password"
            placeholder="Password"
            value={creatingUser.password || ""}
            onChange={(e) =>
              setCreatingUser({ ...creatingUser, password: e.target.value })
            }
          />
          <Select
            value={creatingUser.roleId}
            onChange={(e) =>
              setCreatingUser({
                ...creatingUser,
                roleId: Number(e.target.value),
              })
            }
          >
            <option value={2}>User</option>
            <option value={1}>Admin</option>
          </Select>
          <Button onClick={handleCreateUser}>Create User</Button>
          <Button onClick={cancelCreateUser}>Cancel</Button>
        </Form>
      )}

      {editingUser && (
        <Form>
          <Input
            type="text"
            placeholder="Name"
            value={editingUser.name}
            onChange={(e) =>
              setEditingUser({ ...editingUser, name: e.target.value })
            }
          />
          <Input
            type="email"
            placeholder="Email"
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
          />
          <Input
            type="password"
            placeholder="Password"
            value={editingUser.password || ""}
            onChange={(e) =>
              setEditingUser({ ...editingUser, password: e.target.value })
            }
          />
          <Select
            value={editingUser.roleId}
            onChange={(e) =>
              setEditingUser({ ...editingUser, roleId: Number(e.target.value) })
            }
          >
            <option value={2}>User</option>
            <option value={1}>Admin</option>
          </Select>
          <Button onClick={handleUpdateUser}>Update User</Button>
          <Button onClick={() => setEditingUser(null)}>Cancel</Button>
        </Form>
      )}

      <List>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          users.map((user) => (
            <ListItem key={user.id}>
              <span>{user.name}</span>
              <span>{user.email}</span>
              <span>{getRoleLabel(user.roleId)}</span>
              <Button onClick={() => handleEditUser(user)}>Edit</Button>
              <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
};

export default UserList;
