import "bootstrap/dist/css/bootstrap.min.css";
import "./components.scss";
import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";

function DMModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                name="text"
                type="text"
                placeholder="Write your message!"
                as="textarea"
                rows={6}
              />
            </Form.Group>
            <div className="d-flex align-items-center justify-content-center">
              <Button className="send-button">Send!</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DMModal;
