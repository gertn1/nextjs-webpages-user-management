import React from "react";
import { List, ListItem } from "../styles";

import { FaDeleteLeft } from "react-icons/fa6";
import Button from "@/components/Button";
import { FaEdit, FaTrash } from "react-icons/fa";

interface User {
  id: number;
  name: string;
  email: string;
  roleId: number;
}

interface UserListItemsProps {
  users: User[];
  loading: boolean;
  error: string | null;
  getRoleLabel: (roleId: number) => string;
  setEditingUser: (user: User) => void;
  handleDeleteUser: (userId: number) => void;
}

const UserListItems: React.FC<UserListItemsProps> = ({
  users,
  loading,
  error,
  getRoleLabel,
  setEditingUser,
  handleDeleteUser,
}) => {
  return (
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
              onClick={() => setEditingUser(user)}
              text="Editar"
              icon={<FaEdit />}
            />
            <Button
              onClick={() => handleDeleteUser(user.id)}
              text="Delete"
              backgroundColor="red"
              icon={<FaTrash />}
            />
          </ListItem>
        ))
      )}
    </List>
  );
};

export default UserListItems;
