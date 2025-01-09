import "bootstrap/dist/css/bootstrap.min.css";
import "./components.scss";
import { Button, Form } from "react-bootstrap";
import { ChangeEvent, FormEvent, useState } from "react";
import { User } from "../types/customTypes";

function RegisterComponent() {
  const [newUser, setNewUser] = useState<User | null>(null);
  type FormControlElement =
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement;

  const handleRegisterChange = (e: ChangeEvent<FormControlElement>) => {
    setNewUser({ ...newUser!, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();

    if (newUser) {
      urlencoded.append("email", newUser.email);
      urlencoded.append("password", newUser.password);
    }

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/user/register",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Something went wrong in the response");
      }
      if (response.ok) {
        const result = await response.json();
        console.log("result :>> ", result);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div>
      <Form
        className="register-form poppins-regular"
        onSubmit={handleRegisterSubmit}
      >
        <h3 className="register-title">Register</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={handleRegisterChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleRegisterChange}
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
