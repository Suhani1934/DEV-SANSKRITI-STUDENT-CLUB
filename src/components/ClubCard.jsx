import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./ClubCard.css";

const ClubCard = ({ club }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="card club-card shadow-lg border-0 h-100">
        <div
          className="club-card-img-wrapper"
          onClick={() => setShowModal(true)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={club.image}
            className="card-img-top club-img"
            alt={club.name}
          />
        </div>
        <div className="card-body d-flex flex-column p-4">
          <h5 className="card-title text-blue fw-bold">{club.name}</h5>
          <p className="card-text text-muted flex-grow-1">
            {club.description?.substring(0, 100)}...
          </p>
          <button
            className="btn btn-yellow w-100 d-flex align-items-center justify-content-center gap-2 mt-auto"
            onClick={() => navigate(`/clubs/${club._id}`)}
          >
            <i className="bi bi-eye-fill"></i> View Details
          </button>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{club.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={club.image}
            alt={club.name}
            className="img-fluid rounded mb-3"
          />
          <p>{club.description || "No description available."}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate(`/clubs/${club._id}`)}
          >
            View Full Page
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ClubCard;
