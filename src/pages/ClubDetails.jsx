import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ClubDetails.css';

const ClubDetails = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/clubs/${id}`);
        setClub(res.data);
      } catch (err) {
        console.error('Failed to load club details');
      }
    };
    fetchClub();
  }, [id]);

  if (!club) return <div className="text-center mt-5">Loading club details...</div>;

  return (
    <div className="container py-4 club-details-page">
      <h2 className="mb-3 text-primary fw-bold">{club.name}</h2>

      <div className="nav nav-pills mb-4 gap-2" role="tablist">
        <button className={`nav-link ${activeTab === 'about' && 'active'}`} onClick={() => setActiveTab('about')}>About</button>
        <button className={`nav-link ${activeTab === 'announcements' && 'active'}`} onClick={() => setActiveTab('announcements')}>Announcements</button>
        <button className={`nav-link ${activeTab === 'coordinator' && 'active'}`} onClick={() => setActiveTab('coordinator')}>Coordinator</button>
        <button className={`nav-link ${activeTab === 'members' && 'active'}`} onClick={() => setActiveTab('members')}>Members</button>
        <button className={`nav-link ${activeTab === 'gallery' && 'active'}`} onClick={() => setActiveTab('gallery')}>Gallery</button>
      </div>

      <div className="tab-content bg-white p-4 rounded shadow-sm">
        {activeTab === 'about' && (
          <div>
            <h5 className="text-warning">About the Club</h5>
            <p>{club.description}</p>
          </div>
        )}

        {activeTab === 'announcements' && (
          <div>
            <h5 className="text-warning">Latest Announcements</h5>
            <p>No announcements yet.</p>
          </div>
        )}

        {activeTab === 'coordinator' && (
          <div>
            <h5 className="text-warning">Club Coordinator</h5>
            <p><strong>Name:</strong> {club.coordinator || 'Not Assigned'}</p>
            <p><strong>Email:</strong> {club.coordinatorEmail || 'N/A'}</p>
          </div>
        )}

        {activeTab === 'members' && (
          <div>
            <h5 className="text-warning">Club Members</h5>
            <ul className="list-group">
              {(club.members?.length > 0) ? (
                club.members.map((member, i) => (
                  <li key={i} className="list-group-item">{member.name} - {member.email}</li>
                ))
              ) : (
                <p>No members yet.</p>
              )}
            </ul>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div>
            <h5 className="text-warning">Gallery</h5>
            <div className="row">
              {(club.gallery?.length > 0) ? (
                club.gallery.map((img, i) => (
                  <div className="col-md-3 mb-3" key={i}>
                    <img
                      src={`http://localhost:5000${img}`}
                      alt={`gallery-${i}`}
                      className="img-fluid rounded shadow-sm gallery-img"
                    />
                  </div>
                ))
              ) : (
                <p>No photos in the gallery yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubDetails;
