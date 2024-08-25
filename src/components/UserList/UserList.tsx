// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { apiService } from "@/pages/api/Service/apiService";

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
//   const [creatingUser, setCreatingUser] = useState<User | null>(null); // Estado para controle de criação de usuário
//   const [deletingUser, setDeletingUser] = useState<User | null>(null); // Estado para usuário a ser deletado
//   const [confirmingDelete, setConfirmingDelete] = useState<boolean>(false); // Estado para confirmação de exclusão
//   const [isCreating, setIsCreating] = useState<boolean>(false); // Estado para controlar a exibição do formulário de criação
//   const [refresh, setRefresh] = useState<boolean>(false); // Estado para controle de refresh

//   useEffect(() => {
//     fetchUsers();
//   }, [refresh]); // Executa fetchUsers sempre que `refresh` mudar

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
//         setRefresh(!refresh); // Atualiza o estado de `refresh` para disparar o useEffect
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
//         setRefresh(!refresh); // Atualiza o estado de `refresh` para disparar o useEffect
//       }
//     } catch (error) {
//       console.error("Failed to update user", error);
//     }
//   };

//   const handleDeleteUser = async () => {
//     try {
//       if (deletingUser) {
//         await apiService.delete(`/User/RemoveUser/${deletingUser.id}`);
//         setDeletingUser(null);
//         setConfirmingDelete(false);
//         setRefresh(!refresh); // Atualiza o estado de `refresh` para disparar o useEffect
//       }
//     } catch (error) {
//       console.error("Failed to delete user", error);
//     }
//   };

//   const confirmDeleteUser = (user: User) => {
//     setDeletingUser(user);
//     setConfirmingDelete(true);
//     // Atualiza o estado para exibir o prompt de confirmação
//   };

//   const cancelDelete = () => {
//     setDeletingUser(null);
//     setConfirmingDelete(false); // Cancela a exclusão e esconde o prompt de confirmação
//   };

//   const startCreatingUser = () => {
//     setCreatingUser({ id: 0, name: "", email: "", roleId: 2 }); // Inicializa o estado de criação de usuário
//     setIsCreating(true); // Exibe o formulário de criação
//   };

//   const cancelCreateUser = () => {
//     setCreatingUser(null); // Cancela o processo de criação de usuário
//     setIsCreating(false); // Esconde o formulário de criação
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

//       {confirmingDelete && deletingUser && (
//         <div>
//           <p>Are you sure you want to delete {deletingUser.name}?</p>
//           <Button onClick={handleDeleteUser}>Confirm Delete</Button>
//           <Button onClick={cancelDelete}>Cancel</Button>
//         </div>
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
//               <Button onClick={() => confirmDeleteUser(user)}>Delete</Button>
//             </ListItem>
//           ))
//         )}
//       </List>
//     </Container>
//   );
// };

// export default UserList;

// // Styled components for layout
// const Container = styled.div`
//   padding: 20px;
// `;

// const Form = styled.div`
//   margin-bottom: 20px;
// `;

// const Input = styled.input`
//   padding: 10px;
//   margin-right: 10px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
// `;

// const Select = styled.select`
//   padding: 10px;
//   margin-right: 10px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
// `;

// const Button = styled.button`
//   padding: 10px 20px;
//   margin-right: 10px;
//   background-color: #0070f3;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;

//   &:hover {
//     background-color: #005bb5;
//   }
// `;

// const List = styled.ul`
//   list-style: none;
//   padding: 0;
// `;

// const ListItem = styled.li`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
//   margin-bottom: 10px;

//   span {
//     flex: 1;
//     padding: 0 10px;
//   }
// `;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { apiService } from "@/pages/api/Service/apiService";

interface User {
  id: number;
  name: string;
  email: string;
  roleId: number;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [creatingUser, setCreatingUser] = useState<User | null>(null); // Estado para controle de criação de usuário
  const [deletingUser, setDeletingUser] = useState<User | null>(null); // Estado para usuário a ser deletado
  const [confirmingDelete, setConfirmingDelete] = useState<boolean>(false); // Estado para confirmação de exclusão
  const [isCreating, setIsCreating] = useState<boolean>(false); // Estado para controlar a exibição do formulário de criação
  const [refresh, setRefresh] = useState<boolean>(false); // Estado para controle de refresh

  useEffect(() => {
    fetchUsers();
  }, [refresh]); // Executa fetchUsers sempre que `refresh` mudar

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
        setRefresh(!refresh); // Atualiza o estado de `refresh` para disparar o useEffect
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
        setRefresh(!refresh); // Atualiza o estado de `refresh` para disparar o useEffect
      }
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      if (deletingUser) {
        await apiService.delete(`/User/RemoveUser/${deletingUser.id}`);
        setDeletingUser(null);
        setConfirmingDelete(false);
        setRefresh(!refresh); // Atualiza o estado de `refresh` para disparar o useEffect
      }
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const confirmDeleteUser = (user: User) => {
    setDeletingUser(user);
    setConfirmingDelete(true);

    // Atualiza o estado para exibir o prompt de confirmação
  };

  const cancelDelete = () => {
    setDeletingUser(null);
    setConfirmingDelete(false);
    // Cancela a exclusão e esconde o prompt de confirmação
  };

  const startCreatingUser = () => {
    setCreatingUser({ id: 0, name: "", email: "", roleId: 2 }); // Inicializa o estado de criação de usuário
    setIsCreating(true); // Exibe o formulário de criação
  };

  const cancelCreateUser = () => {
    setCreatingUser(null); // Cancela o processo de criação de usuário
    setIsCreating(false);
    // Esconde o formulário de criação
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

      {confirmingDelete && deletingUser && (
        <div>
          <p>Are you sure you want to delete {deletingUser.name}?</p>
          <Button onClick={handleDeleteUser}>Confirm Delete</Button>
          <Button onClick={cancelDelete}>Cancel</Button>
        </div>
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
              <Button onClick={() => confirmDeleteUser(user)}>Delete</Button>
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
};

export default UserList;

// Styled components for layout
const Container = styled.div`
  padding: 20px;
`;

const Form = styled.div`
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;

  span {
    flex: 1;
    padding: 0 10px;
  }
`;
