import React, { useEffect, useState } from 'react';
import faqsData from '../data/faqs';
import './FAQ.css';

const FAQ = () => {
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    // Simulate loading FAQs
    const timer = setTimeout(() => {
      setFaqs(faqsData);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="faq-container container py-5">
      <h2 className="faq-title text-center mb-4 display-5 fw-bold">
        Frequently Asked Questions
      </h2>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary faq-loader" role="status">
            <span className="visually-hidden">Loading FAQs...</span>
          </div>
        </div>
      ) : (
        <div className="accordion" id="faqAccordion">
          {faqs.map((faq, index) => (
            <div
              className="accordion-item faq-accordion-item fade-in"
              key={index}
            >
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className={`accordion-button faq-accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded={index === 0 ? 'true' : 'false'}
                  aria-controls={`collapse${index}`}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                aria-labelledby={`heading${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body faq-accordion-body">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQ;
