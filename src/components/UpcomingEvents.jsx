import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UpcomingEvents.css";

const UpcomingEvents = () => {
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
    <section className="upcoming-events py-5">
      <div className="container">
        <h2 className="text-center mb-4 text-primary fw-bold">Upcoming Events</h2>
        {events.length === 0 ? (
          <p className="text-center">No upcoming events.</p>
        ) : (
          <div className="row g-4">
            {events.map((event) => (
              <div className="col-md-4" key={event._id}>
                <div className="event-card p-4 shadow-sm rounded h-100 bg-white">
                  <h4 className="text-dark fw-bold">{event.name}</h4>
                  <p className="text-muted">
                    Date: {new Date(event.date).toLocaleDateString()}
                  </p>
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
