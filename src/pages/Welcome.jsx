import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('userName');

  return (
    <div className="welcome-container d-flex flex-column justify-content-center align-items-center text-center text-white">
      <div className="welcome-overlay p-4 rounded-4 shadow-lg animate__animated animate__fadeIn">
        <h1 className="display-4 mb-4 fw-bold text-shadow">
          <i className="bi bi-stars me-2"></i>Welcome, {name}!
        </h1>
        <p className="lead mb-4 text-shadow">
          We're excited to have you explore the student clubs and start your journey!
        </p>
        <button
          className="btn btn-yellow btn-lg d-flex align-items-center gap-2 shadow"
          onClick={() => navigate('/dashboard')}
        >
          <i className="bi bi-arrow-right-circle-fill"></i> Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Welcome;
