import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./ActivityPage.css";

const ActivityPage = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/gallery`);
      setImages(res.data);
    } catch (err) {
      console.error("[FETCH GALLERY ERROR]", err);
      toast.error("Failed to load activity images");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <section className="activity-page py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4 text-primary fw-bold">Activities Gallery</h2>

        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" />
          </div>
        ) : images.length === 0 ? (
          <p className="text-center">No activity images available.</p>
        ) : (
          <div className="row gy-4">
            {images.map((img) => (
              <div key={img._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div
                  className="activity-image-card shadow-sm rounded overflow-hidden position-relative"
                  onClick={() => setSelectedImage(img)}
                  style={{ cursor: "pointer", aspectRatio: "4/3" }}
                >
                  <LazyLoadImage
                    src={img.url}
                    alt={img.caption || ""}
                    className="w-100 h-100 object-fit-cover"
                    effect="blur"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for full image */}
        <Modal
          show={!!selectedImage}
          onHide={() => setSelectedImage(null)}
          centered
          size="lg"
        >
          {selectedImage && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>{selectedImage.caption || ""}</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  className="img-fluid rounded"
                />
              </Modal.Body>
            </>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default ActivityPage;
