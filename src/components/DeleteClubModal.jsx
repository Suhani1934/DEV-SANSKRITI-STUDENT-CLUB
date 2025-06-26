import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const DeleteClubModal = ({ show, handleClose, clubId, refreshClubs }) => {
    const token = localStorage.getItem('token');

    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/clubs/${clubId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Club deleted!');
            handleClose();
            refreshClubs();
        } catch {
            toast.error('Failed to delete club');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this club?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteClubModal;
