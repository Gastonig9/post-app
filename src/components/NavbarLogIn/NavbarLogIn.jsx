import "./NavbarLogIn.css";
import { generateDateString, postRequest } from "../../helpers/helpers";
import { useContext, useEffect } from "react";
import { setContext } from "../../context/context";
import { logout } from "../../helpers/helpers";
import { Link, useNavigate } from "react-router-dom";
const NavbarLogIn = () => {
  const { user, isPremium } = useContext(setContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  
  return (
    <div className="navbarLg-contain">
      <div className="separador-sup"></div>
      <div className="separador-inf"></div>

      <div className="content">
        <h5>InfoShareHub</h5>
        <h5>{generateDateString(new Date())}</h5>

        {!user ? (
          <div className="session">
            <Link to="/auth/login">
              <button>Login</button>
            </Link>
            <Link to="/auth/register">
              <button>Sign in</button>
            </Link>
          </div>
        ) : (
          <div className="dropdown drop-contain">
            <a
              className="btn btn-secondary dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              ¡Hola {`${user.name} ${user.lastName}`}
            </a>

            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to={`/profile/${user._id}`}>
                  Mi perfil
                </Link>
              </li>

              {isPremium ? (
                <li>
                  <Link className="dropdown-item" to="/create-post">
                    Crear post
                  </Link>
                </li>
              ) : (
                <li>
                  <Link className="dropdown-item drop-premium" to="/premium">
                    Premium 👑​
                  </Link>
                </li>
              )}

              <li>
                <Link className="dropdown-item" to="#" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="separador-sup"></div>
      <div className="separador-inf"></div>
    </div>
  );
};

export default NavbarLogIn;
