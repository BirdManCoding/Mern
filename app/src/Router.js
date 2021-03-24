import { Route, Switch, NavLink } from "react-router-dom";
import sendPost from "./pages/sendPost";
import postOverview from "./pages/postOverview";
import register from "./pages/register";
import login from "./pages/login";

function Router() {
  return (
    <div className='Router'>
      <header className='App-header'>
        <nav>
          <ul>
            <li>
              <NavLink to='/'>Post overview</NavLink>
            </li>
            <li>
              <NavLink to='/send'>send Post</NavLink>
            </li>
            <li>
              <NavLink to='/register'>register</NavLink>
            </li>
            <li>
              <NavLink to='/login'>login</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Switch>
          <Route path='/send' component={sendPost} />
          <Route path='/register' component={register} />
          <Route path='/login' component={login} />
          <Route path='/' component={postOverview} />
        </Switch>
      </main>
    </div>
  );
}

export default Router;
