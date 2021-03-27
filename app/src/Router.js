import { useEffect } from "react";
import { Route, Switch, NavLink } from "react-router-dom";

import { useAuth } from "./util/hooks/auth-hook";
import { AuthContext } from "./util/context/auth-context";
import SendPost from "./pages/sendPost";
import PostOverview from "./pages/postOverview";
import Register from "./pages/register";
import Login from "./pages/login";

function Router() {
  const { token, userId, login, logout } = useAuth();

  //useEffect(() => {
  //  console.log({ token, userId });
  //}, [token, userId]);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path='/send' component={SendPost} />
        <Route path='/' component={PostOverview} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/' component={PostOverview} />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      <div className='Router'>
        <header className='App-header'>
          <nav>
            <ul>
              <li>
                <NavLink to='/'>Post overview</NavLink>
              </li>
              {!token ? (
                <div>
                  <li>
                    <NavLink to='/register'>register</NavLink>
                  </li>
                  <li>
                    <NavLink to='/login'>login</NavLink>
                  </li>
                </div>
              ) : (
                <div>
                  <li>
                    <NavLink to='/send'>send Post</NavLink>
                  </li>
                  <li>
                    <h4 onClick={() => logout()}>logout</h4>
                  </li>
                </div>
              )}
            </ul>
          </nav>
        </header>
        <main>{routes}</main>
      </div>
    </AuthContext.Provider>
  );
}

export default Router;
