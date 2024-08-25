import Navbar from "@/components/Navbar/NavBar";
import React, { useState } from "react";
import { apiService } from "./api/Service/apiService";

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
    <div>
      <Navbar />

      <h1>User List</h1>
      <button onClick={fetchUsers} disabled={loading}>
        {loading ? "Loading..." : "Fetch Users"}
      </button>
      {error && <p>Error: {error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} - {getRoleLabel(user.roleId)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
