import "bootstrap/dist/css/bootstrap.min.css";
import "./components.scss";
import { Button, Form } from "react-bootstrap";
import { ChangeEvent, FormEvent, useState } from "react";
import { LoggedInUser, LoginOkResponse } from "../types/customTypes";

function LoginComponent() {
  const [LoggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  type FormControlElement =
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement;

  const handleLoginChange = (e: ChangeEvent<FormControlElement>) => {
    setUserCredentials({
      ...userCredentials!,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();

    if (userCredentials) {
      urlencoded.append("email", userCredentials.email);
      urlencoded.append("password", userCredentials.password);
    }

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/user/login",
        requestOptions
      );
      const result = (await response.json()) as LoginOkResponse;
      console.log("result :>> ", result);
      if (result.token) {
        // store in local storage if there is a token
        localStorage.setItem("token", result.token);
        // set user (probably in auth context) in the user info
        setLoggedInUser(result.user);
      }

      if (!result.token) {
        throw new Error("No token, try to log in again");
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div>
      <Form
        className="register-form poppins-regular"
        onSubmit={handleLoginSubmit}
      >
        <h3 className="register-title">Login</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            value={userCredentials.email}
            onChange={handleLoginChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            value={userCredentials.password}
            onChange={handleLoginChange}
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
