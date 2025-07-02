import React from 'react';
import faqs from '../data/faqs';
import './FAQ.css'; // Import the separate CSS

const FAQ = () => (
  <div className="faq-container container my-5">
    <h2 className="faq-title text-center mb-4">Frequently Asked Questions</h2>

    <div className="accordion" id="faqAccordion">
      {faqs.map((faq, index) => (
        <div className="accordion-item faq-accordion-item" key={index}>
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
  </div>
);

export default FAQ;
