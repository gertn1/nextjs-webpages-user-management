import React from "react";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar/NavBar";
import ProtectedRoute from "@/hoc/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <Navbar />
      <Button>Click aqui</Button>
    </ProtectedRoute>
  );
}
