import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  token: null,
  status: null,
  login: (userId, token) => {},
  logout: () => {},
});
