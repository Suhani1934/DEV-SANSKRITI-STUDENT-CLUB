import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Home.css";
import UpcomingEvents from "../components/UpcomingEvents";
import GallerySlider from "../components/GallerySlider";
import ClubCard from "../components/ClubCard";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";

import banner1 from "../assets/Banners/banner1.PNG";
import banner2 from "../assets/Banners/banner2.PNG";
import banner3 from "../assets/Banners/banner3.PNG";
import banner4 from "../assets/Banners/banner4.PNG";
import banner5 from "../assets/Banners/banner5.PNG";

const Home = () => {
  const [clubs, setClubs] = useState([]);

  const galleryImages = [
    banner1,
    banner2,
    banner3,
    banner4,
    banner5,
    banner1,
    banner2,
    banner3,
    banner4,
    banner5,
    banner1,
    banner2,
    banner3,
    banner4,
    banner5,
  ];

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/clubs`);
      setClubs(res.data);
    } catch (err) {
      console.error("[FETCH CLUBS ERROR]", err);
      setClubs([]);
    }
  };

  const handleEnroll = async (clubId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/enroll/${clubId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Enrollment request sent!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Enrollment failed");
    }
  };

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <section className="hero text-white text-center d-flex align-items-center justify-content-center">
        <div className="container">
          <h1 className="display-4 animate__animated animate__fadeInDown">
            Dev Sanskriti Student's Clubs
          </h1>
          <p className="lead animate__animated animate__fadeInUp">
            Explore, join and enjoy amazing student clubs!
          </p>
          <Link
            to="/register"
            className="btn btn-warning btn-lg mt-3 animate__animated animate__fadeInUp"
          >
            <i className="bi bi-pencil-square me-1"></i>Get Started
          </Link>
        </div>
      </section>

      <UpcomingEvents />
      {/* Clubs Cards */}
      <section className="container py-5">
        <h2 className="mb-4 text-center text-primary">Our Clubs</h2>
        <div className="row g-4">
          {Array.isArray(clubs) && clubs.length > 0 ? (
            clubs.map((club) => (
              <div className="col-md-6 col-lg-4 mb-4" key={club._id}>
                <ClubCard club={club} onEnroll={handleEnroll} />
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center text-muted">No clubs found.</p>
            </div>
          )}
        </div>
      </section>

      <Testimonials />
      {/* Gallery Slider */}
      <GallerySlider images={galleryImages} />
      <FAQ />
    </div>
  );
};

export default Home;
