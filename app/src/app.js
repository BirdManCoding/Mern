import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./util/context/AuthContext";

const App = props => (
  <BrowserRouter>
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  </BrowserRouter>
);

export default App;
