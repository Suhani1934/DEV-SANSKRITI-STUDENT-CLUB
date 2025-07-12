import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Row, Col, Spinner } from "react-bootstrap";

const ManageDashboard = () => {
  const [status, setstatus] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchstatus = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setstatus(res.data);
      } catch (err) {
        console.error("[FETCH status ERROR]", err);
      }
    };
    fetchstatus();
  }, []);

  if (!status) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner />
      </div>
    );
  }

  const cardData = [
    { title: "Registered Students", value: status.totalStudents, bg: "primary" },
    { title: "Enrolled Students", value: status.enrolledStudents, bg: "success" },
    { title: "Total Clubs", value: status.totalClubs, bg: "info" },
    { title: "Total Feedback", value: status.totalFeedback, bg: "warning" },
    { title: "Total Testimonials", value: status.totalTestimonials, bg: "dark" },
    { title: "Total Events", value: status.totalEvents, bg: "dark" },
  ];

  return (
    <div className="container my-5">
      <h3 className="mb-4 fw-bold text-primary text-center">
        Dashboard Overview
      </h3>
      <Row className="g-4">
        {cardData.map((item, idx) => (
          <Col key={idx} xs={12} sm={6} md={4}>
            <Card
              className="shadow border-0 text-white text-center dashboard-card"
              style={{
                background:"#1E3A8A",
                color: idx % 2 === 0 ? "white" : "#1E3A8A",
                borderRadius: "1rem",
              }}
            >
              <Card.Body className="py-4">
                <Card.Title className="text-uppercase fw-semibold fs-6">
                  {item.title}
                </Card.Title>
                <Card.Text className="display-5 fw-bold">
                  {item.value}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ManageDashboard;
