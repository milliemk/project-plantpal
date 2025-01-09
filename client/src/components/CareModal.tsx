import "bootstrap/dist/css/bootstrap.min.css";
import "./components.scss";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

interface careModalProps {
  light: string;
  water: string;
  soil: string;
}

function CareModal({ light, water, soil }: careModalProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="modal-button" onClick={handleShow}>
        Care Guide
      </Button>
      <Button className="seller-button">Send a DM</Button>

      <Modal className="care-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="roboto-slab care-title">
            Care Guide
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="poppins-regular">
          {" "}
          <div className="care-container">
            <p className="symbol-care">
              <span className="material-symbols-outlined">wb_sunny</span>{" "}
              {light}
            </p>
            <p className="symbol-care">
              <span className="material-symbols-outlined">water_drop</span>
              {water}
            </p>
            <p className="symbol-care">
              <span className="material-symbols-outlined">potted_plant</span>{" "}
              {soil}
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CareModal;
