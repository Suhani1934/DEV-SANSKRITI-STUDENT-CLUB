import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Spinner, Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/testimonials/approved`
      );
      setTestimonials(res.data);
    } catch (err) {
      console.error("[FETCH TESTIMONIALS ERROR]", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner />
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="container text-center py-5">
        <h4>No approved testimonials yet.</h4>
        <Button
          variant="warning"
          className="text-white fw-bold mt-3"
          onClick={() => navigate("/submit-testimonial")}
        >
          Be the First to Share!
        </Button>
      </div>
    );
  }

  return (
    <div className="container testimonial-section py-5">
      <div className="d-flex justify-content-between align-items-center mb-4 px-2 px-md-4">
        <h2 className="text-primary fw-bold">What Students Say</h2>
        <Button
          variant="warning"
          className="text-white fw-bold"
          onClick={() => navigate("/submit-testimonial")}
        >
          Share Your Thought
        </Button>
      </div>

      <div className="testimonial-slider-wrapper mx-auto">
        <Swiper
          slidesPerView={3}
          slidesPerGroup={1}
          spaceBetween={30}
          loop={testimonials.length >= 4}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            0: { slidesPerView: 1, slidesPerGroup: 1 },
            768: { slidesPerView: 2, slidesPerGroup: 2 },
            992: { slidesPerView: 3, slidesPerGroup: 3 },
          }}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t._id}>
              <div className="card shadow testimonial-card">
                {t.photo && (
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="card-img-top object-fit-cover testimonial-photo"
                    height={200}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title text-primary fw-bold">{t.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{t.course}</h6>
                  <p className="card-text">{t.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
