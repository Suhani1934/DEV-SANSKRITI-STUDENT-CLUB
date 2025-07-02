import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import GallerySlider from '../components/GallerySlider';

import banner1 from '../assets/Banners/banner1.jpg';
import banner2 from '../assets/Banners/banner2.jpg';
import banner3 from '../assets/Banners/banner3.jpeg';
import banner4 from '../assets/Banners/banner4.jpg';
import banner5 from '../assets/Banners/banner5.jpg';

const ClubDetailPage = () => {
  const { clubId } = useParams();
  const [club, setClub] = useState(null);
  const token = localStorage.getItem('token');

  const galleryImages = [
    banner1, banner2, banner3, banner4, banner5,
    banner1, banner2, banner3, banner4, banner5,
  ];

  useEffect(() => {
    fetchClubDetails();
  }, []);

  // const fetchClubDetails = async () => {
  //   try {
  //     const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/clubs/${clubId}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setClub(res.data);
  //   } catch (err) {
  //     console.error('[FETCH CLUB DETAIL ERROR]', err);
  //     toast.error('Failed to load club details');
  //   }
  // };

  const fetchClubDetails = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/club-details/${clubId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClub(res.data);
    } catch {
      toast.error('Failed to load club details');
    }
  };


  if (!club) return <div className="text-center my-5">Loading club details...</div>;

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary display-5 mb-2 animate__animated animate__fadeInDown">{club.name}</h2>
        <p className="lead text-muted animate__animated animate__fadeIn">{club.description || 'No description available.'}</p>
      </div>

      {/* Categories */}
      <div className="mb-5">
        <h4 className="text-secondary fw-bold mb-3">Categories</h4>
        <div className="d-flex flex-wrap gap-2">
          {club.categories?.length > 0 ? (
            club.categories.map((cat, i) => (
              <span
                key={i}
                className="badge bg-gradient p-2 fs-6 shadow-sm animate__animated animate__zoomIn"
                style={{ background: 'linear-gradient(45deg, #ffd700, #f9a825)', cursor: 'pointer' }}
              >
                {cat}
              </span>
            ))
          ) : (
            <span className="text-muted">No categories available.</span>
          )}
        </div>
      </div>

      {/* Coordinator */}
      <div className="mb-5">
        <h4 className="text-secondary fw-bold mb-3">Coordinator</h4>
        {club.coordinator ? (
          <div className="card border-0 shadow-sm p-3 animate__animated animate__fadeInUp">
            <div className="card-body">
              <h5 className="card-title text-dark fw-bold">{club.coordinator.name}</h5>
              <p className="card-text text-muted mb-0">{club.coordinator.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-muted">No coordinator assigned yet.</p>
        )}
      </div>

      {/* Members */}
      <div className="mb-5">
        <h4 className="text-secondary fw-bold mb-3">Members</h4>
        {club.members?.length > 0 ? (
          <div className="row g-3">
            {club.members.map((m) => (
              <div key={m.student._id} className="col-md-4">
                <div className="card h-100 border-0 shadow-sm animate__animated animate__zoomIn">
                  <div className="card-body">
                    <h6 className="fw-bold text-primary">{m.student.name}</h6>
                    <p className="text-muted mb-0">Category: <strong>{m.category}</strong></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No members enrolled yet.</p>
        )}
      </div>

      {/* Gallery */}
      <div className="mb-5">
        <h4 className="text-secondary fw-bold mb-3">Gallery</h4>
        <GallerySlider images={galleryImages} />
      </div>
    </div>
  );
};

export default ClubDetailPage;
