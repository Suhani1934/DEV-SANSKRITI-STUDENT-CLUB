import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ClubDetailModal = ({ show, handleClose, club }) => {
    if (!club) return null;

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{club.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img
                    src={`http://localhost:5000/${club.image}`}
                    alt={club.name}
                    className="img-fluid rounded mb-3"
                />
                <p><strong>Description:</strong> {club.description}</p>
                <p><strong>Category:</strong> {club.category || 'Not specified'}</p>
                {club.createdBy && (
                    <p><strong>Created By:</strong> {club.createdBy.name || 'Admin'}</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ClubDetailModal;
