import "bootstrap/dist/css/bootstrap.min.css";
import "./components.scss";
import { Button, Form } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, user } = useContext(AuthContext);

  //redirect after login
  const navigateTo = useNavigate();
  const redirectToProfilePage = () => {
    navigateTo("/profile");
  };

  //handle emailchange
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  //handle passwordchange
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.preventDefault();
    try {
      await login(email, password);
      console.log("user logged in");
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  useEffect(() => {
    if (user) redirectToProfilePage();
  }, [user]);

  return (
    <div>
      <Form
        className="register-form poppins-regular"
        onSubmit={handleLoginClick}
      >
        <h3 className="register-title">Login</h3>
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

export default LoginComponent;
