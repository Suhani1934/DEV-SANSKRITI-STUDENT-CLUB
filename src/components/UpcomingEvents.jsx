import React, { useEffect, useState } from "react";
import axios from "axios";
import { Accordion, Spinner } from "react-bootstrap";
import "./UpcomingEvents.css";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
      setEvents(res.data);
    } catch (err) {
      console.error("[FETCH EVENTS ERROR]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <section className="upcoming-events bg-light">
      <div className="container">
        {loading ? (
          <div className="d-flex justify-content-center py-4">
            <Spinner />
          </div>
        ) : events.length === 0 ? (
          <p className="text-center text-muted">No upcoming events.</p>
        ) : (
          <Accordion>
            {events.map((event, idx) => (
              <Accordion.Item eventKey={idx.toString()} key={event._id}>
                <Accordion.Header className="event-header fw-bold text-dark">
                  {event.name}{" "}
                </Accordion.Header>
                <Accordion.Body>
                  <p className="mb-2 text-secondary">
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;
