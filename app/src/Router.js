import { Route, Switch, NavLink } from "react-router-dom";

import axios from "./util/axios-instance";
import SendPost from "./pages/sendPost";
import PostOverview from "./pages/postOverview";
import Register from "./pages/register";
import Login from "./pages/login";

function Router() {
  return (
    <div className='Router'>
      <header className='App-header'>
        <nav>
          <ul>
            <li>
              <NavLink to='/'>Post overview</NavLink>
            </li>
            <div>
              <li>
                <NavLink to='/register'>register</NavLink>
              </li>
              <li>
                <NavLink to='/login'>login</NavLink>
              </li>
            </div>

            <div>
              <li>
                <NavLink to='/send'>send Post</NavLink>
              </li>
              <li>
                <h4
                  onClick={async () => {
                    const res = await axios.post("api/users/logout");
                    console.log(res);
                  }}
                >
                  logout
                </h4>
              </li>
            </div>
          </ul>
        </nav>
      </header>
      <main>
        <Switch>
          <Route path='/send' component={SendPost} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/' component={PostOverview} />
        </Switch>
      </main>
    </div>
  );
}

export default Router;
