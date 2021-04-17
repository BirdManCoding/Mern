import { useContext } from "react";
import AuthContext from "../../util/context/AuthContext";
import { NavLink } from "react-router-dom";

const Navbar = props => {
  const { loggedIn, logout } = useContext(AuthContext);
  return (
    <header className='App-header'>
      <nav>
        <ul>
          {!loggedIn ? (
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
                <h4 onClick={logout}>logout</h4>
              </li>
              <li>
                <NavLink to='/send'>send Post</NavLink>
              </li>
            </div>
          )}
          <li>
            <NavLink to='/'>Post overview</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
