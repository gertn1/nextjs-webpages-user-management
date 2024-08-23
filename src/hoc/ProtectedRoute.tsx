import React from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "@/pages/api/auth/authService";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login/login");
    }
  }, []);

  if (!isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
