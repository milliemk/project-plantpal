import "bootstrap/dist/css/bootstrap.min.css";
import "./components.scss";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

interface AddNewMessageProps {
  threadId: string;
  sendMessageFnc: (threadId: string, message: string) => void;
}

function AddNewMessage({ threadId, sendMessageFnc }: AddNewMessageProps) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const handleOnChange = (e: any) => {
    setMessage(e.target.value);
    setError(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (message.length > 1) {
      sendMessageFnc(threadId, message);
      setMessage("");
    } else {
      setError(true);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group
        className="mb-3"
        style={{ margin: 20, fontFamily: "Poppins" }}
      >
        {error && <p>Please enter a message</p>}
        <Form.Control
          name="text"
          type="text"
          placeholder="Write your message!"
          as="textarea"
          value={message}
          onChange={handleOnChange}
          rows={2}
        />
      </Form.Group>
      <div className="d-flex align-items-center justify-content-center">
        <Button type="submit" className="send-profile-message-button">
          Send!
        </Button>
      </div>
    </Form>
  );
}

export default AddNewMessage;
