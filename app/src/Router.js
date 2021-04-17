import { useContext } from "react";
import { Route, Switch } from "react-router-dom";

import AuthContext from "./util/context/AuthContext";
import Navbar from "./components/shared/navbar";
import SendPost from "./pages/sendPost";
import PostOverview from "./pages/postOverview";
import Register from "./pages/register";
import Login from "./pages/login";

function Router() {
  const { loggedIn } = useContext(AuthContext);

  function renderRoutes() {
    if (loggedIn) {
      return (
        <Switch>
          <Route path='/' component={PostOverview} exact />
          <Route path='/send' component={SendPost} />
        </Switch>
      );
    } else {
      return (
        <Switch>
          <Route path='/' component={PostOverview} exact />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
        </Switch>
      );
    }
  }

  return (
    <div className='Router'>
      <Navbar />
      <main>{renderRoutes()}</main>
    </div>
  );
}

export default Router;
