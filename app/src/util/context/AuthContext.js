import { useState, useEffect, createContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "../axios-instance";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState();
  let history = useHistory();

  async function getLoggedIn() {
    const { data } = await axios.get("/api/users/loggedIn");
    setLoggedIn(data);
  }

  async function logout() {
    history.push("/");
    await axios.get("api/users/logout");
    await getLoggedIn();
  }

  function login() {
    getLoggedIn();
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, logout, login }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
