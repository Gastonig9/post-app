import "./NavbarLogIn.css";
import { generateDateString } from "../../helpers/helpers";
import { useContext } from "react";
import { setContext } from "../../context/context";
import { logout } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";
const NavbarLogIn = () => {
  const { user } = useContext(setContext);
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
            <a href="/auth/login">
              <button>Login</button>
            </a>
            <a href="/auth/register">
              <button>Sign in</button>
            </a>
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
                <a className="dropdown-item" href={`/profile/${user._id}`}>
                  Mi perfil
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/create-post">
                  Crear post
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={handleLogout}>
                  Logout
                </a>
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
