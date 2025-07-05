import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";

const ManageTestimonials = () => {
  const [pending, setPending] = useState([]);
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
              <td>
                <Button size="sm" variant="success" onClick={() => handleApprove(t._id)}>
                  Approve
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageTestimonials;
