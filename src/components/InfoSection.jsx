import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Tab, Tabs } from "react-bootstrap";
import { FaBullhorn, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import axios from "axios";

import "./InfoSection.css";

const InfoSection = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("announcements");

  // const announcements = [
  //   {
  //     title:
  //       "Post-Doctoral Fellowship (PDF) Seats under Visvesvaraya PhD Scheme, Phase II",
  //     isNew: true,
  //   },
  //   {
  //     title:
  //       "Information for New UG (BTech & BDes), PG and PhD Students (July 2025)",
  //     isNew: true,
  //   },
  //   {
  //     title:
  //       "Admission to 4-Year Bachelor of Science (BS) programme in Biomedical Science and Engineering",
  //     isNew: true,
  //   },
  //   {
  //     title:
  //       "Admission to PhD / MTech / MDes / MS(R) / MA Programmes for July 2025 Session",
  //     isNew: false,
  //   },
  //   {
  //     title: "Admission to MBA Programmes for July 2025 Session",
  //     isNew: false,
  //   },
  // ];

  // const activities = [
  //   {
  //     title: "Recruitment Notice for Project Assistants - July 2025",
  //     isNew: true,
  //   },
  //   {
  //     title: "Walk-in Interview for Technical Staff - 20 July 2025",
  //     isNew: false,
  //   },
  // ];

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
    <div className="container py-5">
      <div className="row g-4">
        {/* Left side: Upcoming Events */}
        <div className="col-md-4">
          <h5 className="d-flex align-items-center mb-3">
            <FaCalendarAlt className="me-2 text-warning" /> Upcoming Events
          </h5>

          <div className="list-group rounded shadow-sm event-list-wrapper">
            {events.length === 0 ? (
              <p className="text-center text-muted m-0 p-3">
                No upcoming events.
              </p>
            ) : (
              events.map((event) => (
                <div
                  key={event._id}
                  className="list-group-item d-flex align-items-center gap-3 py-3 px-3 event-item"
                >
                  {/* date */}
                  <div className="event-date-box text-center bg-primary text-white p-2 rounded" style={{ width: 100 }}>
                    <div className="fw-bold text-uppercase">
                      {new Date(event.date).toLocaleString("default", {
                        month: "short",
                      })}
                    </div>
                    <div className="fs-4 fw-bold">
                      {new Date(event.date).getDate()}
                    </div>
                    <div className="small">
                      {new Date(event.date).getFullYear()}
                    </div>
                  </div>

                  {/* Event with date */}
                  <div className="flex-grow-1">
                    <h6 className="fw-semibold mb-1 text-dark">{event.name}</h6>
                    <div className="text-muted small">
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <Button
            variant="dark" className="mt-3"
            onClick={() => navigate("/events")}
          >
            View All
          </Button>
        </div>

        {/* Right side: Announcements & Recruitment Tabs */}
        <div className="col-md-8">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
          >
            <Tab
              eventKey="announcements"
              title={
                <span>
                  <FaBullhorn className="me-1" /> Announcement
                </span>
              }
            >
              {/* <ul className="list-unstyled ps-3">
                {announcements.map((item, index) => (
                  <li key={index} className="mb-2 border-bottom pb-2">
                    <span className="me-2">»</span>
                    {item.title}{" "}
                    {item.isNew && (
                      <span className="badge bg-danger ms-2">New</span>
                    )}
                  </li>
                ))}
              </ul> */}
              <Button variant="dark" className="mt-2">
                View All
              </Button>
            </Tab>
            <Tab
              eventKey="activities"
              title={
                <span>
                  <FiActivity className="me-1" /> Activities
                </span>
              }
            >
              {/* <ul className="list-unstyled ps-3">
                {activities.map((item, index) => (
                  <li key={index} className="mb-2 border-bottom pb-2">
                    <span className="me-2">»</span>
                    {item.title}{" "}
                    {item.isNew && (
                      <span className="badge bg-danger ms-2">New</span>
                    )}
                  </li>
                ))}
              </ul> */}
              <Button variant="dark" className="mt-2">
                View All
              </Button>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
