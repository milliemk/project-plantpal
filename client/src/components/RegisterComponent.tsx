import "bootstrap/dist/css/bootstrap.min.css";
import "./components.scss";
import { Button, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";

function RegisterComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { register, user } = useContext(AuthContext);

  const navigateTo = useNavigate();
  const redirectToLoginPage = () => {
    navigateTo("/login");
  };

  //handle emailchange
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // handle passwordchange
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  //handle registerclick
  const handleRegisterClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await register(username, email, password);

      redirectToLoginPage();
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  return (
    <div>
      <Form
        className="register-form poppins-regular"
        onSubmit={handleRegisterClick}
      >
        <h3 className="register-title">Register</h3>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="name"
            type="name"
            placeholder="Enter username"
            value={username}
            onChange={handleUsernameChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>
        <Button
          className="register-button"
          variant="outline-info"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default RegisterComponent;
