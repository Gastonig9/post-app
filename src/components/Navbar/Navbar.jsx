import { Link } from "react-router-dom";
import { navLinks } from "../../assets/constants/constants";
import "./Navbar.css"


const Navbar = () => {
  return (
    <div className="navbar-contain">
      <ul>
        {navLinks.map((link, index) => {
          return (
            <Link key={index} to={link.link}>
              <li>{link.name}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Navbar;
