import React, { useState } from "react";
import { Button, Form, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import courses from '../data/courses';
import { toast } from "react-toastify";

const SubmitTestimonialForm = () => {
  const [form, setForm] = useState({ name: "", course: "", text: "", photo: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_API_URL}/api/testimonials`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Testimonial submitted, awaiting approval!");
      setForm({ name: "", course: "", text: "", photo: "" });
    } catch (err) {
      console.error("[SUBMIT TESTIMONIAL ERROR]", err);
      toast.error(err.response?.data?.error || "Failed to submit testimonial.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4 p-4 border rounded">
      <h4 className="text-primary mb-3">Share Your Experience</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Course</Form.Label>
          <Form.Control
            type="text"
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Your Testimonial (max 300 chars)</Form.Label>
          <Form.Control
            as="textarea"
            maxLength={300}
            rows={3}
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Photo URL (optional)</Form.Label>
          <Form.Control
            type="text"
            value={form.photo}
            onChange={(e) => setForm({ ...form, photo: e.target.value })}
          />
        </Form.Group>

        <Button type="submit" disabled={loading}>
          {loading ? <Spinner size="sm" /> : "Submit Testimonial"}
        </Button>
      </Form>
    </div>
  );
};

export default SubmitTestimonialForm;
