import "bootstrap/dist/css/bootstrap.min.css";
import "./components.scss";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router";

interface NewPostModalProps {
  show: boolean;
  handleClose: () => void;
}

function NewPostModal({ show, handleClose }: NewPostModalProps) {
  return (
    <>
      <Modal show={show} onHide={handleClose} className="new-post-modal">
        <Modal.Header closeButton className="new-post-header">
          <Modal.Title className="new-post-modal-title">
            Post successfully uploaded!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="new-post-modal-buttons">
            <Link to="/">
              {" "}
              <Button className="redirect-new-post-button">
                <div className="d-flex align-items-end justify-content-center">
                  {" "}
                  <span className="material-symbols-outlined me-2">
                    home
                  </span>{" "}
                  <span>Home Page</span>
                </div>
              </Button>
            </Link>
            <Link to="/listings">
              {" "}
              <Button className="redirect-new-post-button">
                <div className="d-flex align-items-end justify-content-center">
                  {" "}
                  <span className="material-symbols-outlined me-2">
                    potted_plant
                  </span>{" "}
                  <span>See All Plants</span>
                </div>
              </Button>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NewPostModal;
