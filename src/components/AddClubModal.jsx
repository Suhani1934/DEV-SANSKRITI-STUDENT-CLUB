import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddClubModal = ({ show, handleClose, onClubAdded }) => {
    const [form, setForm] = useState({ name: '', description: '', categories: '' });
    const [image, setImage] = useState(null);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleImageChange = (e) => setImage(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const categoriesArray = form.categories
            .split(',')
            .map((cat) => cat.trim())
            .filter(Boolean);

        const data = new FormData();
        data.append('name', form.name);
        data.append('description', form.description);

        data.append('categories', JSON.stringify(categoriesArray));

        if (image) data.append('image', image);

        try {
            // console.log([...data.entries()]);
            await axios.post(`${import.meta.env.VITE_API_URL}/api/clubs`, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
            toast.success('Club created successfully');
            onClubAdded();
            handleClose();
        } catch (err) {
            console.error('[ADD CLUB ERROR]', err.response || err);
            toast.error(err.response?.data?.error || 'Failed to add club');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Club</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Club Name</Form.Label>
                        <Form.Control
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            rows={3}
                            value={form.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Categories <small>(comma separated)</small>
                        </Form.Label>
                        <Form.Control
                            name="categories"
                            value={form.categories}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Club Image</Form.Label>
                        <Form.Control type="file" onChange={handleImageChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                        Add Club
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddClubModal;
