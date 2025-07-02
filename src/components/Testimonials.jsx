import React, { useState } from 'react';
import testimonials from '../data/testimonials';
import './Testimonials.css';

const Testimonials = () => {
  const testimonialsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  const startIdx = (currentPage - 1) * testimonialsPerPage;
  const currentTestimonials = testimonials.slice(startIdx, startIdx + testimonialsPerPage);

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4 testimonials-title">What Our Students Say</h2>

      <div className="row justify-content-center">
        {currentTestimonials.map((t, idx) => (
          <div className="col-md-6 col-lg-4 mb-4" key={idx}>
            <div className="testimonial-card p-4 h-100 shadow">
              <p className="testimonial-text mb-4">“{t.text}”</p>
              <div className="testimonial-author">
                <h5 className="mb-1">{t.name}</h5>
                <small>{t.role}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center gap-2">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={handlePrev}
          disabled={currentPage === 1}
        >
          &laquo; Previous
        </button>
        <span className="align-self-center fw-bold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next &raquo;
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
