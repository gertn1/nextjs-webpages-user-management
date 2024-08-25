import { getCookie, setCookie, deleteCookie } from "cookies-next";

const TOKEN = "authToken";

export const getToken = (): string | null => {
  return getCookie(TOKEN) as string | null;
};

export const setToken = (token: string): void => {
  setCookie(TOKEN, token, { maxAge: 7 * 24 * 60 * 60, path: "/" });
};

export const removeToken = (): void => {
  deleteCookie(TOKEN, { path: "/" });
};
