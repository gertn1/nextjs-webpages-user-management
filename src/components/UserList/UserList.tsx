import React, { useState, useEffect } from "react";
import { apiService } from "@/pages/api/Service/apiService";
import { Container, Form, Input, List, ListItem, Select } from "./styles";
import Button from "../Button";
import { FaEdit, FaUserPlus } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

interface User {
  id: number;
  name: string;
  email: string;
  roleId: number;
  password?: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [creatingUser, setCreatingUser] = useState<User | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [deletedUserId, setDeletedUserId] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [deletedUserId]);

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
        setCreatingUser(null);
        setIsCreating(false);
        fetchUsers();
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
        fetchUsers();
      }
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      console.log("Deleting user with ID:", userId);
      await apiService.delete(`/User/RemoveUser/${userId}`);
      setDeletedUserId(userId);
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const startCreatingUser = () => {
    setCreatingUser({ id: 0, name: "", email: "", roleId: 2, password: "" });
    setIsCreating(true);
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
        <Button
          onClick={startCreatingUser}
          text="Novo Usuario"
          icon={<FaUserPlus />}
        ></Button>
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
          <Button onClick={handleCreateUser} text="Criar Usuario"></Button>
          <Button onClick={cancelCreateUser} text="Cancelelar"></Button>
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
          <Button
            onClick={handleUpdateUser}
            text="Atualizar"
            icon={<FaEdit />}
          ></Button>
          <Button onClick={() => setEditingUser(null)} text="Cancelar"></Button>
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
              <Button
                onClick={() => handleEditUser(user)}
                text="Editar"
                icon={<FaEdit />}
              ></Button>
              <Button
                onClick={() => handleDeleteUser(user.id)}
                text="Delete"
                backgroundColor="red"
                icon={<FaDeleteLeft />}
              ></Button>
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
};

export default UserList;
