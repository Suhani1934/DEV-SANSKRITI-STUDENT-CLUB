import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './GallerySlider.css';

const GallerySlider = ({ images }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageClick = (img) => {
    setSelectedImg(img);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedImg(null);
  };

  return (
    <div id="gallery" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4 text-primary">Visit Our Gallery</h2>
        <div className="slider mt-4">
          <div className="d-flex align-items-center gap-4 p-4 slider-track">
            {images.map((img, idx) => (
              <div
                className="slide position-relative"
                key={idx}
                onClick={() => handleImageClick(img)}
                style={{ cursor: 'pointer' }}
              >
                <img src={img} alt={`Gallery image ${idx}`} className="img-fluid rounded shadow-sm" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal to show full image */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Body className="p-0">
          {selectedImg && (
            <img
              src={selectedImg}
              alt="Full gallery view"
              className="img-fluid w-100"
              style={{ maxHeight: '80vh', objectFit: 'contain' }}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default GallerySlider;
