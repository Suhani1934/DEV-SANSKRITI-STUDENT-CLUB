import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Modal, Form, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";

const ManageTestimonials = () => {
  const [pending, setPending] = useState([]);
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const token = localStorage.getItem("token");
  const testimonialsPerPage = 10;

  const fetchPending = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/testimonials/pending`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPending(res.data);
    } catch (err) {
      console.error("[FETCH PENDING ERROR]", err);
    }
  };

  const fetchAll = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/testimonials/all`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAllTestimonials(res.data);
      setFilteredTestimonials(res.data.filter((t) => t.status !== "pending"));
    } catch (err) {
      console.error("[FETCH ALL ERROR]", err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/testimonials/${id}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Testimonial approved!");
      fetchPending();
      fetchAll();
    } catch (err) {
      console.error("[APPROVE ERROR]", err);
      toast.error("Failed to approve testimonial.");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/testimonials/${id}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Testimonial rejected!");
      fetchPending();
      fetchAll();
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
      fetchAll();
    } catch (err) {
      console.error("[EDIT ERROR]", err);
      toast.error("Failed to update testimonial.");
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = allTestimonials
      .filter((t) => t.status !== "pending")
      .filter(
        (t) =>
          t.name.toLowerCase().includes(term) ||
          t.course.toLowerCase().includes(term) ||
          t.status.toLowerCase().includes(term)
      );
    setFilteredTestimonials(filtered);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLast = currentPage * testimonialsPerPage;
  const indexOfFirst = indexOfLast - testimonialsPerPage;
  const currentTestimonials = filteredTestimonials.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(
    filteredTestimonials.length / testimonialsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchPending();
    fetchAll();
  }, []);

  return (
    <div className="container mt-4">
      {/* Pending Testimonials */}
      <h4 className="mb-3">Pending Testimonials</h4>
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
              <td>
                {t.photo ? <img src={t.photo} alt="" width={80} /> : "N/A"}
              </td>
              <td className="d-flex gap-2">
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => handleApprove(t._id)}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="warning"
                  onClick={() => handleEditClick(t)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleReject(t._id)}
                >
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

      {/* All Testimonials with Search and Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
        <h4 className="mb-0">All Testimonials</h4>
        <Form.Control
          type="text"
          placeholder="Search by name, course or status"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: "300px" }}
        />
      </div>

      <Table bordered responsive>
        <thead className="table-secondary">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Course</th>
            <th>Text</th>
            <th>Photo</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentTestimonials
            .filter((t) => t.status === "approved" || t.status === "cancelled")
            .map((t, index) => (
              <tr key={t._id}>
                <td>{(currentPage - 1) * testimonialsPerPage + index + 1}</td>
                <td>{t.name}</td>
                <td>{t.course}</td>
                <td>{t.text}</td>
                <td>
                  {t.photo ? <img src={t.photo} alt="" width={80} /> : "N/A"}
                </td>
                <td>
                  {t.status === "approved" ? (
                    <span className="badge bg-success">Approved</span>
                  ) : (
                    <span className="badge bg-danger text-light">
                      Cancelled
                    </span>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {/* Pagination Component */}
      {totalPages > 1 && (
        <Pagination className="justify-content-end">
          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={idx + 1 === currentPage}
              onClick={() => paginate(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </div>
  );
};

export default ManageTestimonials;
