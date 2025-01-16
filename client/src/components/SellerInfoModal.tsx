import "bootstrap/dist/css/bootstrap.min.css";
import "./components.scss";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { Seller } from "../types/customTypes";

interface SellerInfoProps {
  seller: Seller | null;
}

function SellerInfoModal({ seller }: SellerInfoProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} className="seller-info-button">
        {seller?.username}:
      </Button>
      <Modal
        className="seller-modal"
        show={show}
        onHide={handleClose}
        size="sm"
      >
        <Modal.Header closeButton className="Seller-modal-header">
          <div className="seller-mod">
            <span className="material-symbols-outlined white ">
              account_circle
            </span>
            <span className="seller-title"> {seller?.username}</span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-row align-items-center gap-3">
            <img
              src={seller?.avatar?.secureUrl}
              alt="Seller Picture"
              width={100}
              height={100}
              className="avatar-info-box"
            />
            <div style={{ fontSize: 14 }} className="info-box-seller">
              <span>
                Member since: <p>2024-01-03</p>{" "}
              </span>
              <p>Plants posted: {seller?.postedListings?.length}</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SellerInfoModal;
