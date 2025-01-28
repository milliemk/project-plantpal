import "bootstrap/dist/css/bootstrap.min.css";
import "./components.scss";
import { Button, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { login } = useContext(AuthContext);

  const navigateTo = useNavigate();
  const redirectToProfilePage = () => {
    navigateTo("/profile/listings");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.preventDefault();
    try {
      await login(email, password);
      console.log("user logged in");
      redirectToProfilePage();
    } catch (error) {
      console.log("Error during login:", error);
      const errorResponse = error as Error;
      setErrorMsg(errorResponse.message);
    }
  };

  return (
    <div>
      <Form
        className="register-form poppins-regular"
        onSubmit={handleLoginClick}
      >
        <p>{errorMsg}</p>
        <h3 className="register-title">Login</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address:</Form.Label>
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
        <br />
        <Button
          className="register-button"
          variant="outline-info"
          type="submit"
        >
          Submit
        </Button>
        <div className="message-login-register" style={{ marginTop: 30 }}>
          Don't have an account yet? <a href="/register">Register here!</a>
        </div>
      </Form>
    </div>
  );
}

export default LoginComponent;
