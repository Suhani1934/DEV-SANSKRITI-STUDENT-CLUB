import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Home = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/clubs`);
        setClubs(res.data);
      } catch {
        toast.error('Failed to load clubs');
      }
    };
    fetchClubs();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-warning text-center py-5 text-white">
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to Our University Clubs</h1>
          <p className="lead">
            Explore, join, and make your university life vibrant!
          </p>
          <a href="/register" className="btn btn-primary btn-lg mt-3">
            Join Now
          </a>
        </div>
      </section>

      {/* Clubs Section */}
      <section className="container py-5">
        <h2 className="text-center mb-4">Explore Our Clubs</h2>
        <div className="row g-4">
          {clubs.length === 0 ? (
            <p className="text-muted text-center">No clubs available.</p>
          ) : (
            clubs.map((club) => (
              <div className="col-md-4" key={club._id}>
                <div className="card h-100 border-0 shadow club-card">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${club.image}`}
                    className="card-img-top"
                    alt={club.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{club.name}</h5>
                    <p className="card-text flex-grow-1">
                      {club.description?.slice(0, 100)}...
                    </p>
                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() => alert(`Viewing details for ${club.name}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-4 mt-5">
        <div className="container">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} University Student Club Portal.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Home;
