import { Button, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components.scss";
import { NavLink } from "react-router";
import useUserStatus from "../hooks/useUserStatus";

function Navigation() {
  const IsUserLoggedIn = useUserStatus();
  const logut = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="navigation">
      {IsUserLoggedIn === "logged in" ? (
        <Button onClick={logut}>Log out</Button>
      ) : null}

      <Dropdown drop="down-centered">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <span className="material-symbols-outlined menu-symbol">menu</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu">
          <Dropdown.Item as={NavLink} to="/">
            Home
          </Dropdown.Item>
          <Dropdown.Item as={NavLink} to="listings">
            Plants
          </Dropdown.Item>
          <Dropdown.Item as={NavLink} to="/register">
            Register
          </Dropdown.Item>
          <Dropdown.Item as={NavLink} to="/login">
            Login
          </Dropdown.Item>
          <Dropdown.Item as={NavLink} to="/profile">
            Profile
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Navigation;
