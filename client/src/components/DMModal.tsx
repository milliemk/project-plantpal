import "bootstrap/dist/css/bootstrap.min.css";
import "./components.scss";
import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";

interface StartThreadProps {
  listingId: string;
  startThreadFnc: (listingId: string, message: string) => void;
}

function DMModal({ listingId, startThreadFnc }: StartThreadProps) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOnChange = (e: any) => {
    setMessage(e.target.value);
    setError(false);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (message.length > 1) {
      startThreadFnc(listingId, message);
      setMessage("");
      setShow(false);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Button onClick={handleShow} className="seller-button">
        Send a DM
      </Button>
      <Modal
        className="seller-modal"
        show={show}
        onHide={handleClose}
        size="sm"
      >
        <Modal.Header closeButton className="DM-modal-header ">
          <span className="material-symbols-outlined white ">mail</span>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              {" "}
              {error && <p>Please enter a message</p>}
              <Form.Control
                name="text"
                type="text"
                placeholder="Write your message!"
                as="textarea"
                rows={6}
                onChange={handleOnChange}
                value={message}
              />
            </Form.Group>
            <div className="d-flex align-items-center justify-content-center">
              <Button type="submit" className="send-button">
                Send!
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DMModal;
