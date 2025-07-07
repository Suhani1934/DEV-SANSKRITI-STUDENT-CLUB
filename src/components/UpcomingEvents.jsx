import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import "./UpcomingEvents.css";

const UpcomingEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
      setEvents(res.data);
    } catch (err) {
      console.error("[FETCH EVENTS ERROR]", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <section className="upcoming-events-section py-5 bg-light position-relative overflow-hidden">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h3 className="text-primary fw-bold mb-0">
            <i className="bi bi-calendar-event me-2"></i> Upcoming Events
          </h3>
          <Button
            variant="warning"
            className="fw-bold text-white px-4"
            onClick={() => navigate("/events")}
          >
            View All
          </Button>
        </div>

        {events.length === 0 ? (
          <p className="text-center text-muted">No upcoming events.</p>
        ) : (
          <div className="list-group rounded event-list overflow-auto">
            {events.map((event) => (
              <div
                key={event._id}
                className="list-group-item list-group-item-action d-flex align-items-center gap-4 py-3 px-4 event-item shadow-sm"
              >
                <div className="event-date-box flex-shrink-0 text-center rounded bg-primary text-white p-2">
                  <div className="fw-bold text-uppercase">
                    {new Date(event.date).toLocaleString("default", { month: "short" })}
                  </div>
                  <div className="fs-3 fw-bold">{new Date(event.date).getDate()}</div>
                  <div className="small">{new Date(event.date).getFullYear()}</div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-1 fw-semibold text-dark">{event.name}</h5>
                  <div className="text-muted small">
                    Date: {new Date(event.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;
