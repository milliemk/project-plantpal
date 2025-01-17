import { Button, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components.scss";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

function Navigation() {
  const { logout, isAuthenticated } = useContext(AuthContext);

  const navigateTo = useNavigate();
  const redirectToProfilePage = () => {
    navigateTo("/");
  };

  const handleLogout = () => {
    logout();
    redirectToProfilePage();
    console.log("user logged out");
  };

  return (
    <div className="navigation">
      {isAuthenticated ? (
        <Button className="logout-button" onClick={handleLogout}>
          Log out
        </Button>
      ) : null}

      <Dropdown drop="down-centered">
        <Dropdown.Toggle
          className="dropdown-toggle-nav"
          variant="success"
          id="dropdown-basic"
        >
          <span className="material-symbols-outlined menu-symbol">menu</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="dropdown-menu-nav">
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
