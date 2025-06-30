import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CategorySelectModal = ({ show, handleClose, categories, onConfirm }) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedCategory) return;
        onConfirm(selectedCategory);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Select Enrollment Category</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Select one category for enrollment:</Form.Label>
                        <Form.Select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            required
                        >
                            <option value="">-- Select Category --</option>
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="primary">Confirm</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default CategorySelectModal;
