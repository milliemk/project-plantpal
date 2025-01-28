import "bootstrap/dist/css/bootstrap.min.css";
import "./components.scss";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

function PleaseLogInModal() {
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
        <Modal.Header closeButton className="please-DM-header ">
          <span className="material-symbols-outlined white ">login</span>
        </Modal.Header>
        <Modal.Body>
          <p className="please-modal-body">
            Please <a href="/login">log in</a> first.
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PleaseLogInModal;
