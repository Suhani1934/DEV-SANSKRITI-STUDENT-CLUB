import React from "react";
import { Link } from "react-router-dom";
import UpcomingEvents from "../components/UpcomingEvents";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./HeroSection.css";
import banner5 from "../assets/Banners/banner5.PNG";
import banner6 from "../assets/Banners/banner6.PNG";
import banner7 from "../assets/Banners/banner7.PNG";
import banner8 from "../assets/Banners/banner8.PNG";
import banner9 from "../assets/Banners/banner9.PNG";

const images = [
  banner5,
  banner6,
  banner7,
  banner8,
  banner9,
];

const HeroSection = () => {
  return (
    <section className="hero-section position-relative">
      {/* Swiper Background */}
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        className="hero-bg-swiper"
        loop={true}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        navigation
        slidesPerView={1}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} alt={`bg-${i}`} className="bg-img" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content Overlay */}
      <div className="hero-overlay py-5 d-flex align-items-center">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-7 text-center text-lg-start text-white">
              <h1 className="display-4 animate__animated animate__fadeInDown">
                Dev Sanskriti Student's Clubs
              </h1>
              <p className="lead animate__animated animate__fadeInUp">
                Explore, join, and enjoy amazing student clubs!
              </p>
              <Link
                to="/register"
                className="btn btn-warning btn-lg mt-3 animate__animated animate__fadeInUp"
              >
                <i className="bi bi-pencil-square me-1"></i> Get Started
              </Link>
            </div>

            <div className="col-lg-5">
              <div className="event-card p-2 rounded shadow animate__animated animate__fadeInRight bg-white">
                <UpcomingEvents />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;