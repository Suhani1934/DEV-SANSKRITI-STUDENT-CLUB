import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GallerySlider from '../components/GallerySlider';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import banner1 from '../assets/Banners/banner1.jpg'
import banner2 from '../assets/Banners/banner2.jpg'
import banner3 from '../assets/Banners/banner3.jpeg'
import banner4 from '../assets/Banners/banner4.jpg'
import banner5 from '../assets/Banners/banner5.jpg'

const Home = () => {
  const [clubs, setClubs] = useState([]);

  const galleryImages = [banner1,banner2,banner3,banner4,banner5,banner1,banner2,banner3,banner4,banner5,banner1,banner2,banner3,banner4,banner5];
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/clubs`);
        setClubs(res.data);
      } catch {
        console.error('Failed to load clubs');
      }
    };
    fetchClubs();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero text-white text-center d-flex align-items-center justify-content-center">
        <div className="container">
          <h1 className="display-4 animate__animated animate__fadeInDown">Dev Sanskriti Student's Clubs</h1>
          <p className="lead animate__animated animate__fadeInUp">Explore, join and enjoy amazing student clubs!</p>
          <a href="/register" className="btn btn-warning btn-lg mt-3 animate__animated animate__fadeInUp">Get Started</a>
        </div>
      </section>

      {/* Clubs Cards */}
      <section className="container py-5">
        <h2 className="mb-4 text-center text-primary">Our Clubs</h2>
        <div className="row g-4">
          {clubs.map((club) => (
            <div className="col-md-6 col-lg-4" key={club._id}>
              <div className="card h-100 club-card shadow border-0 animate__animated animate__fadeInUp">
                <img
                  src={`${import.meta.env.VITE_API_URL}/${club.image}`}
                  className="card-img-top club-image"
                  alt={club.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{club.name}</h5>
                  <p className="card-text">{club.description?.slice(0, 100)}...</p>
                  <button className="btn btn-outline-primary btn-sm">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Slider */}
      <GallerySlider images={galleryImages} />
    </div>
  );
};

export default Home;
