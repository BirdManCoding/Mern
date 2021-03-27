import { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "../axios-instance";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExperationDate, setTokenExperationDate] = useState(null);
  const history = useHistory();

  const login = useCallback((userId, tokn, experationDate) => {
    setToken(tokn);
    setUserId(userId);
    const toknExperationDate =
      experationDate || new Date(new Date().getTime() + 3000 * 60 * 60);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        token: tokn,
        userId,
        experation: toknExperationDate.toISOString(),
      })
    );

    setTokenExperationDate(toknExperationDate);

    axios.interceptors.request.use(config => {
      config.headers["authorization"] = `bearer ${tokn}`;
      return config;
    });
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExperationDate(null);
    localStorage.removeItem("userData");
    history.push("/login");
  }, [history]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.experation) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.experation)
      );
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExperationDate) {
      const remainingTime =
        tokenExperationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExperationDate]);

  return { token, userId, login, logout };
};
