import { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "../axios-instance";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExperationDate, setTokenExperationDate] = useState(null);
  const history = useHistory();

  const login = useCallback((userId, experationDate, token) => {
    setToken(token);
    setUserId(userId);

    const tokenExperationDate =
      experationDate || new Date(new Date().getTime() + 3000 * 60 * 60);
  }, []);
};
