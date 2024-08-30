import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import styled from "styled-components";

const apiUrl = "https://localhost:7066/api/Profile";

interface Profile {
  id: number;
  name: string;
  email: string;
  password: string;
  roleId: number;
  phone: string;
  address: string;
  fullName: string;
  birthDate: string;
}

const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const ProfileUpdate: React.FC = () => {
  const [profile, setProfile] = useState<Profile>({
    id: 0,
    name: "",
    email: "",
    password: "",
    roleId: 2,
    phone: "",
    address: "",
    fullName: "",
    birthDate: "",
  });

  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(apiUrl);
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/${profile.id}`, profile);
      router.push("/success");
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <Container>
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={profile.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={profile.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={profile.password}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Role"
          name="roleId"
          value={profile.roleId}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value={1}>Admin</MenuItem>
          <MenuItem value={2}>User</MenuItem>
        </TextField>
        <TextField
          label="Phone"
          name="phone"
          value={profile.phone}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={profile.address}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Full Name"
          name="fullName"
          value={profile.fullName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Birth Date"
          name="birthDate"
          type="datetime-local"
          value={profile.birthDate}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Update Profile
        </Button>
      </form>
    </Container>
  );
};

export default ProfileUpdate;
