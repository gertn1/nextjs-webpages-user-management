import React, { useState, useEffect } from "react";
import { apiService } from "@/pages/api/Service/apiService";
import { Container } from "./styles";
import Button from "../Button";
import { FaUserPlus } from "react-icons/fa";
import UserForm from "./UserForm";
import UserListItems from "./UserListItems";

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
  const [isCreating, setIsCreating] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers();
  }, []);

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
    if (editingUser) {
      try {
        await apiService.post("/User/CreateUser", {
          ...editingUser,
        });
        setEditingUser(null);
        setIsCreating(false);
        fetchUsers();
      } catch (error) {
        console.error("Failed to create user", error);
      }
    }
  };

  const handleEditUser = async () => {
    if (editingUser) {
      try {
        await apiService.put(`/User/EditUser/${editingUser.id}`, editingUser);
        setEditingUser(null);

        fetchUsers();
      } catch (error) {
        console.error("Failed to update user", error);
      }
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await apiService.delete(`/User/RemoveUser/${userId}`);
      fetchUsers();
    } catch (error) {
      console.log("userlist");
      console.error("Failed to delete user", error);
    }
  };

  const startCreatingUser = () => {
    setEditingUser({
      id: 0,
      name: "",
      email: "",
      roleId: 2,
      password: "",
    });
    setIsCreating(true);
  };

  const cancelCreateOrEditUser = () => {
    setEditingUser(null);
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
  console.log("criado ");
  return (
    <Container>
      <h1>User List</h1>
      {!isCreating && !editingUser && (
        <>
          <Button
            onClick={startCreatingUser}
            text="Novo Usuario"
            icon={<FaUserPlus />}
          />
        </>
      )}

      {(isCreating || editingUser) && (
        <UserForm
          user={editingUser!}
          onChange={(e) =>
            setEditingUser({
              ...editingUser!,
              [e.target.name]:
                e.target.name === "roleId"
                  ? Number(e.target.value)
                  : e.target.value,
            })
          }
          onSubmit={isCreating ? handleCreateUser : handleEditUser}
          onCancel={cancelCreateOrEditUser}
          isEditing={!!editingUser}
        />
      )}

      <UserListItems
        users={users}
        loading={loading}
        error={error}
        getRoleLabel={getRoleLabel}
        setEditingUser={setEditingUser}
        handleDeleteUser={handleDeleteUser}
      />
    </Container>
  );
};

export default UserList;
