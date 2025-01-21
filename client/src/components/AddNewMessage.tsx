import "bootstrap/dist/css/bootstrap.min.css";
import "./components.scss";
import { Button, Form } from "react-bootstrap";

function AddNewMessage() {
  return (
    <Form>
      <Form.Group
        className="mb-3"
        style={{ margin: 20, fontFamily: "Poppins" }}
      >
        <Form.Control
          name="text"
          type="text"
          placeholder="Write your message!"
          as="textarea"
          rows={2}
        />
      </Form.Group>
      <div className="d-flex align-items-center justify-content-center">
        <Button className="send-profile-message-button">Send!</Button>
      </div>
    </Form>
  );
}

export default AddNewMessage;
