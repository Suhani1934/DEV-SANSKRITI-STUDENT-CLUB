import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import "./FeedbackForm.css";

const FeedbackForm = () => {
  const { clubId } = useParams();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-form-container my-5 p-4 rounded shadow animate-fade-in">
      <h4 className="mb-4 text-primary fw-bold border-bottom pb-2">
        Share Your Feedback
      </h4>
      {success && <Alert variant="success" className="animate-slide-in">{success}</Alert>}
      {error && <Alert variant="danger" className="animate-slide-in">{error}</Alert>}

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="message">
          <Form.Label className="fw-semibold">Your Feedback</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="What did you think of the club?"
            className="feedback-textarea"
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="feedback-submit-btn px-4 py-2 fw-bold"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" className="me-2" />
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </Form>
    </div>
  );
};

export default FeedbackForm;
