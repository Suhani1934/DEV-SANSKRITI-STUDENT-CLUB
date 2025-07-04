import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import GallerySlider from "../components/GallerySlider";
import FeedbackForm from "../components/FeedbackForm";

import "./ClubDetailPage.css";

import banner from "../assets/Banners/banner.PNG";
import banner1 from "../assets/Banners/banner1.PNG";
import banner2 from "../assets/Banners/banner2.PNG";
import banner3 from "../assets/Banners/banner3.PNG";
import banner4 from "../assets/Banners/banner4.PNG";
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

const ClubDetailPage = () => {
  const { clubId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const galleryImages = [
    banner,
    banner1,
    banner2,
    banner3,
    banner4,
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

  const fetchClubDetail = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/club-details/${clubId}`
      );
      setData(res.data);
      setLoading(false);
    } catch (err) {
      console.error("[FETCH CLUB DETAIL ERROR]", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubDetail();
  }, [clubId]);

  if (loading)
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (!data)
    return (
      <div className="container py-5">
        <h2>Club not found</h2>
      </div>
    );

  const { basic, admin, members } = data;

  return (
    <div className="club-detail container py-5">
      <div className="text-center mb-5">
        <h1 className="club-title">{basic.name}</h1>
        <p className="club-subtitle">Explore everything about this club</p>
      </div>

      <div className="row align-items-center mb-5">
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="club-logo-container">
            <img
              src={admin.logo || "/default.jpg"}
              alt={basic.name}
              className="img-fluid rounded shadow club-logo"
            />
          </div>
        </div>
        <div className="col-md-6 club-about">
          <h4>About the Club</h4>
          <p>{admin.description || "No description available."}</p>

          <h5>Categories</h5>
          <div className="club-categories mb-3">
            {basic.categories?.map((c, i) => (
              <span key={i} className="badge category-badge me-2 mb-2">
                {c}
              </span>
            ))}
          </div>

          <h5>Coordinator</h5>
          <p className="mb-0 fw-bold">{admin.coordinator?.name || "N/A"}</p>
          <p className="text-muted">{admin.coordinator?.email || ""}</p>
        </div>
      </div>

      <div className="mb-5 club-members">
        <h4 className="mb-4">Members</h4>
        {members.length > 0 ? (
          <div className="row g-3">
            {members.map((m) => (
              <div key={m._id} className="col-12 col-md-6 col-lg-4">
                <div className="member-card p-3 rounded shadow h-100">
                  <h6 className="fw-bold mb-1">{m.student?.name}</h6>
                  <p className="text-muted mb-2">{m.student?.email}</p>
                  <span className="badge category-badge">{m.category}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No members yet.</p>
        )}
      </div>

      {/* Gallery Slider */}
      <GallerySlider images={galleryImages} />

      <FeedbackForm />
    </div>
  );
};

export default ClubDetailPage;
