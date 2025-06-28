import { useNavigate } from 'react-router-dom';
import './ClubCard.css';

const ClubCard = ({ club }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/clubs/${club._id}`);
  };

  return (
    <div className="card club-card shadow-lg border-0 h-100">
      <div className="club-card-img-wrapper">
        <img
          src={club.image}
          className="card-img-top club-img"
          alt={club.name}
        />
      </div>
      <div className="card-body d-flex flex-column p-4">
        <h5 className="card-title text-blue fw-bold">{club.name}</h5>
        <p className="card-text text-muted flex-grow-1">
          {club.description?.substring(0, 100)}...
        </p>
        <button
          className="btn btn-yellow w-100 d-flex align-items-center justify-content-center gap-2 mt-auto"
          onClick={handleViewDetails}
        >
          <i className="bi bi-eye-fill"></i> View Details
        </button>
      </div>
    </div>
  );
};

export default ClubCard;
