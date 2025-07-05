import React from "react";
import { Link } from "react-router-dom";
import UpcomingEvents from "../components/UpcomingEvents";
import "./HeroSection.css";

const HeroSection = ({ upcomingEvent }) => {
  return (
    <section className="hero-section py-5 d-flex align-items-center">
      <div className="container">
        <div className="row g-4 align-items-center">
          {/* Left Side - Hero Text */}
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 text-primary animate__animated animate__fadeInDown">
              Dev Sanskriti Student's Clubs
            </h1>
            <p className="lead text-dark animate__animated animate__fadeInUp">
              Explore, join, and enjoy amazing student clubs!
            </p>
            <Link
              to="/register"
              className="btn btn-warning btn-lg mt-3 animate__animated animate__fadeInUp"
            >
              <i className="bi bi-pencil-square me-1"></i> Get Started
            </Link>
          </div>

          {/* Right Side - Upcoming Event */}
          <div className="col-lg-5">
            <div className="event-card p-4 rounded shadow animate__animated animate__fadeInRight">
              <h4 className="text-primary mb-3">📅 Upcoming Event</h4>
              <UpcomingEvents />
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
