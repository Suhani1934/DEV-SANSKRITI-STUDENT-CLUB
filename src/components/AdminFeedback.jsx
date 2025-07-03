import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Alert } from "react-bootstrap";

const AdminFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeedbacks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/feedbacks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFeedbacks(res.data);
      setLoading(false);
    } catch (err) {
      // console.error("[FETCH FEEDBACKS ERROR]", err);
      setError(err.response?.data?.error || "Failed to fetch feedbacks");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error)
    return (
      <div className="container py-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );

  return (
    <div className="container py-5">
      {feedbacks.length === 0 ? (
        <p>No feedbacks found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-primary">
              <tr>
                <th>Student</th>
                <th>Club</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((fb) => (
                <tr key={fb._id}>
                  <td>
                    {fb.student?.name || "Unknown"}
                    <br />
                    <small>{fb.student?.email || ""}</small>
                  </td>
                  <td>{fb.club?.name || "Unknown"}</td>
                  <td>{fb.message}</td>
                  <td>{new Date(fb.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminFeedbacks;
