import { setCookie, deleteCookie, getCookie } from "cookies-next";

export interface LoginResponse {
  token: string;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch("https://localhost:7066/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to login: ${errorText}`);
    }

    const data: LoginResponse = await response.json();

    setCookie("authToken", data.token, { maxAge: 7 * 24 * 60 * 60, path: "/" });

    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Login failed");
  }
};

export const logout = (): void => {
  // Remove o token do cookie
  deleteCookie("authToken", { path: "/" });
};

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  return !!getCookie("authToken");
};
