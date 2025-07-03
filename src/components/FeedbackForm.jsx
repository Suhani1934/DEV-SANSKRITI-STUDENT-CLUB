import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";
import "./FeedbackForm.css";

const FeedbackForm = () => {
  const { clubId } = useParams();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/feedbacks`,
        {
          clubId,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(res.data.message);
      setMessage("");
    } catch (err) {
      console.error("[FEEDBACK ERROR]", err);
      setError(err.response?.data?.error || "Failed to submit feedback");
    }
  };

  return (
    <div className="feedback-form-container my-5 p-4 rounded shadow">
      <h4 className="mb-4 text-primary">Share Your Feedback</h4>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Your Feedback</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="What did you think of the club?"
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="px-4">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default FeedbackForm;
