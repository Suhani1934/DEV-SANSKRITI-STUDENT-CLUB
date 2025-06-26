import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();
    const name = localStorage.getItem('userName');

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
            <h1 className="display-4 mb-4 text-primary">Welcome, {name} 🎉</h1>
            <p className="lead text-muted mb-4">We’re excited to have you explore the student clubs!</p>
            <button
                className="btn btn-warning btn-lg shadow"
                onClick={() => navigate('/dashboard')}
            >
                Go to Dashboard
            </button>
        </div>
    );
};

export default Welcome;
