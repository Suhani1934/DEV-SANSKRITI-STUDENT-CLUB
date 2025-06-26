import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddClubModal = ({ show, handleClose, refreshClubs }) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !image) {
            toast.error('Club name and image are required.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', desc);
        formData.append('category', category);
        formData.append('image', image);

        try {
            await axios.post('${import.meta.env.VITE_API_URL}/api/clubs', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Club created successfully!');
            handleClose();
            refreshClubs();
            // reset form
            setName('');
            setDesc('');
            setCategory('');
            setImage(null);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.error || 'Error creating club');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add New Club</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Club Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter club name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter club description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g. Technical, Cultural"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Club Image</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Create Club
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddClubModal;
