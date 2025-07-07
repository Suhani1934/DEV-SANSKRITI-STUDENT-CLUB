import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import "./AllEvents.css";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "forthcoming";

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
      setEvents(res.data);
    } catch (err) {
      console.error("[FETCH ALL EVENTS ERROR]", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();

    let filtered = events;

    if (filter === "forthcoming") {
      filtered = events.filter((e) => new Date(e.date) >= now);
    } else if (filter === "current") {
      filtered = events.filter((e) => new Date(e.date).getFullYear() === year);
    } else if (filter === "past") {
      filtered = events.filter((e) => new Date(e.date) < now);
    }

    setFilteredEvents(filtered);
  }, [events, filter]);

  return (
    <section className="all-events-page py-5">
      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 mb-4">
            <div className="btn-group-vertical w-100" role="group">
              <button
                onClick={() => setSearchParams({ filter: "forthcoming" })}
                className={`btn ${
                  filter === "forthcoming" ? "btn-warning text-white" : "btn-outline-warning"
                } mb-2`}
              >
                <i className="bi bi-calendar-plus me-2"></i> Forthcoming Events
              </button>
              <button
                onClick={() => setSearchParams({ filter: "current" })}
                className={`btn ${
                  filter === "current" ? "btn-warning text-white" : "btn-outline-warning"
                } mb-2`}
              >
                <i className="bi bi-calendar-check me-2"></i> Current Year Events
              </button>
              <button
                onClick={() => setSearchParams({ filter: "past" })}
                className={`btn ${
                  filter === "past" ? "btn-warning text-white" : "btn-outline-warning"
                }`}
              >
                <i className="bi bi-calendar-x me-2"></i> Past Events
              </button>
            </div>
          </div>

          {/* Events Table */}
          <div className="col-md-9">
            <div className="table-responsive">
              <table className="table table-striped align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>Event</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No events found.
                      </td>
                    </tr>
                  ) : (
                    filteredEvents.map((e) => (
                      <tr key={e._id}>
                        <td>{e.name}</td>
                        <td>{new Date(e.date).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="text-end mt-3 small text-muted">
              Showing {filteredEvents.length} {filteredEvents.length === 1 ? "entry" : "entries"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllEvents;
