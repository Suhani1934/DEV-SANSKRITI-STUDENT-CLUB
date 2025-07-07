import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Home.css";
import ThoughtOfTheDay from "../components/ThoughtOfTheDay";
import HeroSection from "../components/HeroSection";
import UpcomingEvents from "../components/UpcomingEvents";
import GallerySlider from "../components/GallerySlider";
import ClubCard from "../components/ClubCard";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";

import banner5 from "../assets/Banners/banner5.PNG";
import banner6 from "../assets/Banners/banner6.PNG";
import banner7 from "../assets/Banners/banner7.PNG";
import banner8 from "../assets/Banners/banner8.PNG";
import banner9 from "../assets/Banners/banner9.PNG";
import banner10 from "../assets/Banners/banner10.PNG";
import banner11 from "../assets/Banners/banner11.PNG";
import banner12 from "../assets/Banners/banner12.PNG";
import banner13 from "../assets/Banners/banner13.PNG";
import banner14 from "../assets/Banners/banner14.PNG";
import banner15 from "../assets/Banners/banner15.PNG";

const Home = () => {
  const [clubs, setClubs] = useState([]);

  const galleryImages = [
    banner5,
    banner6,
    banner7,
    banner8,
    banner9,
    banner10,
    banner11,
    banner12,
    banner13,
    banner14,
    banner15,
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

      <ThoughtOfTheDay/>
      <HeroSection upcomingEvent={UpcomingEvents} />

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
