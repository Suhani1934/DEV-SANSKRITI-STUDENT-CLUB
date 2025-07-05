import React, { useState } from "react";
import axios from "axios";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import courses from "../data/courses";
import "./SubmitTestimonialForm.css";

const SubmitTestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    text: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("course", formData.course);
      data.append("text", formData.text);
      if (formData.photo) data.append("photo", formData.photo);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/testimonials`,data
      );

      setSuccess(res.data.message);
      setFormData({ name: "", course: "", text: "", photo: null });
      toast.success("Testimonial submitted successfully!");
    } catch (err) {
      console.error("[SUBMIT TESTIMONIAL ERROR]", err);
      setError(err.response?.data?.error || "Failed to submit testimonial");
      toast.error("Failed to submit testimonial");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 testimonial-form-container shadow rounded">
      <h2 className="mb-4 text-primary">Share Your Experience</h2>

      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select Course</Form.Label>
          <Form.Select
            value={formData.course}
            onChange={(e) =>
              setFormData({ ...formData, course: e.target.value })
            }
            required
          >
            <option value="">-- Select Course --</option>
            {courses.map((course, idx) => (
              <option key={idx} value={course}>
                {course}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Your Experience (max 500 chars)</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            maxLength={500}
            placeholder="Share your experience..."
            value={formData.text}
            onChange={(e) =>
              setFormData({ ...formData, text: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Upload Photo (optional)</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, photo: e.target.files[0] })
            }
          />
        </Form.Group>

        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? <Spinner size="sm" /> : "Submit"}
        </Button>
      </Form>
    </div>
  );
};

export default SubmitTestimonialForm;
