import { Link } from 'react-router-dom';
import './ClubCard.css';

const ClubCard = ({ club }) => {
  return (
    <div className="card club-card shadow-sm h-100">
      <img
        src={`${club.image}`}
        className="card-img-top club-img"
        alt={club.name}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-primary fw-bold">{club.name}</h5>
        <p className="card-text text-muted flex-grow-1">
          {club.description?.substring(0, 100)}...
        </p>
        <Link to={`/clubs/${club._id}`} className="btn btn-warning mt-auto view-btn">
          View Details
        </Link>
        <button
          className="btn btn-sm btn-success mt-2"
          onClick={() => handleEnroll(club._id)}
        >
          Enroll
        </button>

      </div>
    </div>
  );
};

export default ClubCard;
