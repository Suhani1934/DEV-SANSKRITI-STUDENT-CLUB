import React from 'react';
import './GallerySlider.css';

const GallerySlider = ({ images }) => {
  return (
    <div id="gallery" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4 text-primary">Visit Our Gallery</h2>
        <div className="slider mt-4">
          <div className="d-flex align-items-center gap-4 p-4 slider-track">
            {images.map((img, idx) => (
              <div className="slide" key={idx}>
                <img src={img} alt={`Gallery image ${idx}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallerySlider;
