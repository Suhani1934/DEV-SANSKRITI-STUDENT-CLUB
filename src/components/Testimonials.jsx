import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const navigate = useNavigate();

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/testimonials/approved`);
      setTestimonials(res.data);
    } catch (err) {
      console.error("[FETCH TESTIMONIALS ERROR]", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">What Students Say</h2>
        <Button
          variant="warning"
          className="text-white fw-bold"
          onClick={() => navigate("/submit-testimonial")}
        >
          Share Your Experience
        </Button>
      </div>
      <div className="row g-4">
        {testimonials.map((t) => (
          <div key={t._id} className="col-md-4">
            <div className="card shadow-sm h-100">
              {t.photo && (
                <img
                  src={t.photo}
                  alt={t.name}
                  className="card-img-top object-fit-cover"
                  height={200}
                />
              )}
              <div className="card-body">
                <h5 className="card-title text-primary">{t.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{t.course}</h6>
                <p className="card-text">{t.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
