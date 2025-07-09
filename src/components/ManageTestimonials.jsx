import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const ManageTestimonials = () => {
  const [pending, setPending] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const token = localStorage.getItem("token");

  const fetchPending = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/testimonials/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPending(res.data);
    } catch (err) {
      console.error("[FETCH PENDING ERROR]", err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/testimonials/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Testimonial approved!");
      fetchPending();
    } catch (err) {
      console.error("[APPROVE ERROR]", err);
      toast.error("Failed to approve testimonial.");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/testimonials/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Testimonial rejected!");
      fetchPending();
    } catch (err) {
      console.error("[REJECT ERROR]", err);
      toast.error("Failed to reject testimonial.");
    }
  };

  const handleEditClick = (testimonial) => {
    setEditData(testimonial);
    setShowModal(true);
  };

  const handleEditSave = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/testimonials/${editData._id}`,
        {
          name: editData.name,
          course: editData.course,
          text: editData.text,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Testimonial updated!");
      setShowModal(false);
      fetchPending();
    } catch (err) {
      console.error("[EDIT ERROR]", err);
      toast.error("Failed to update testimonial.");
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <div className="container mt-4">
      <Table bordered responsive>
        <thead className="table-primary">
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Text</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pending.map((t) => (
            <tr key={t._id}>
              <td>{t.name}</td>
              <td>{t.course}</td>
              <td>{t.text}</td>
              <td>{t.photo ? <img src={t.photo} alt="" width={80} /> : "N/A"}</td>
              <td className="d-flex gap-2">
                <Button size="sm" variant="success" onClick={() => handleApprove(t._id)}>
                  Approve
                </Button>
                <Button size="sm" variant="warning" onClick={() => handleEditClick(t)}>
                  Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleReject(t._id)}>
                  Cancel
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Testimonial</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editData && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Course</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.course}
                  onChange={(e) =>
                    setEditData({ ...editData, course: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Text</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={editData.text}
                  onChange={(e) =>
                    setEditData({ ...editData, text: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageTestimonials;
