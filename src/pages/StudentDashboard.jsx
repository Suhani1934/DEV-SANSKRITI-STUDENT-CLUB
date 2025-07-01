import { useEffect, useState } from 'react';
import axios from 'axios';
import StudentSidebar from '../components/StudentSidebar';
import StudentProfile from '../components/StudentProfile';
import { toast } from 'react-toastify';
import CategorySelectModal from '../components/CategorySelectModal';
// import 'bootstrap/dist/css/bootstrap.min.css';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [student, setStudent] = useState({});
  const [clubs, setClubs] = useState([]);
  const [enrolledClubIds, setEnrolledClubIds] = useState([]);
  const [enrolledClubs, setEnrolledClubs] = useState([]);
  const [requestedClubIds, setRequestedClubIds] = useState([]);
  const [enrollmentRequests, setEnrollmentRequests] = useState([]);

  const token = localStorage.getItem('token');

  // Modal states
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedClubId, setSelectedClubId] = useState(null);
  const [selectedClubCategories, setSelectedClubCategories] = useState([]);

  useEffect(() => {
    fetchClubs();
    fetchStudent();
    fetchRequestedClubIds();
    fetchEnrollmentRequests();
  }, []);

  const fetchClubs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/clubs`);
      setClubs(res.data);
    } catch {
      toast.error('Failed to load clubs');
    }
  };

  const fetchStudent = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const enrolled = res.data.enrolledClubs || [];
      setEnrolledClubIds(enrolled.map((enroll) => enroll.club?._id));
      setEnrolledClubs(enrolled);
      setStudent(res.data);

    } catch {
      toast.error('Failed to fetch student info');
    }
  };

  const fetchRequestedClubIds = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/enrollment-requests/my-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const ids = res.data
        .filter(req => req.status === 'pending')
        .map(req => req.club._id);
      setRequestedClubIds(ids);
    } catch {
      toast.error('Failed to load requested clubs');
    }
  };

  const fetchEnrollmentRequests = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/enrollment-requests/my-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnrollmentRequests(res.data);
    } catch {
      toast.error('Failed to fetch request history');
    }
  };

  const handleRequestEnroll = (clubId, clubCategories) => {
    if (!clubCategories || clubCategories.length === 0) {
      toast.error('No categories available for this club');
      return;
    }
    setSelectedClubId(clubId);
    setSelectedClubCategories(clubCategories);
    setShowCategoryModal(true);
  };

  const handleConfirmCategory = async (category) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/enrollment-requests/${selectedClubId}`,
        { category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Enrollment request sent!');
      fetchRequestedClubIds();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to send request');
    }
  };

  const handleUnenroll = async (clubId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/enroll/unenroll/${clubId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Unenrolled successfully!');
      fetchStudent();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Unenrollment failed');
    }
  };

  const renderClubCard = (club) => (
    <div className="col-md-6 col-lg-4 mb-4" key={club._id}>
      <div className="card h-100 shadow-sm">
        <img
          src={`/${club.image}`}
          className="card-img-top"
          alt={club.name}
          style={{ height: '180px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-primary fw-bold">{club.name}</h5>

          <p className="card-text text-muted flex-grow-1 mb-2">
            {club.description?.slice(0, 100) || 'No description available'}
          </p>

          {club.categories?.length > 0 && (
            <p className="text-secondary mb-2">
              <small>Categories: {club.categories.join(', ')}</small>
            </p>

          )}

          {/* {enrolledClubIds.includes(club._id) ? (
            <button className="btn btn-danger btn-sm mt-auto" onClick={() => handleUnenroll(club._id)}>
              Unenroll
            </button>
          ) :  */}
          {requestedClubIds.includes(club._id) ? (
            <button className="btn btn-secondary btn-sm mt-auto" disabled>
              Requested
            </button>
          ) : (
            <button className="btn btn-primary btn-sm mt-auto" onClick={() => handleRequestEnroll(club._id, club.categories)}>
              Click here to Enroll
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderEnrolledClubCard = (enrollment) => {
    const club = enrollment.club;
    const studentCategory = enrollment.category;

    if (!club) return null;

    return (
      <div className="col-md-6 col-lg-4 mb-4" key={club._id}>
        <div className="card h-100 shadow-sm">
          <img
            src={`/${club.image}`}
            className="card-img-top"
            alt={club.name}
            style={{ height: '180px', objectFit: 'cover' }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title text-primary fw-bold">{club.name}</h5>

            <p className="card-text text-muted flex-grow-1 mb-2">
              {club.description?.slice(0, 100) || 'No description available'}
            </p>

            <p className="text-success mb-2 fw-semibold">
              Selected Category: {studentCategory || 'N/A'}
            </p>

            {/* {club.categories?.length > 0 && (
              <p className="text-secondary mb-2">
                <small>Available Categories: {club.categories.join(', ')}</small>
              </p>
            )} */}

            <button className="btn btn-primary btn-sm mt-auto" onClick={() => handleViewDetails(club._id)}>
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-md-3 p-0">
          <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="col-md-9 p-4 overflow-auto">

          {activeTab === 'profile' && <StudentProfile student={student} />}

          {activeTab === 'clubs' && (
            <>
              <h4>Clubs</h4>
              <div className="row g-3 mt-3">{clubs.map((club) => renderClubCard(club))}</div>
            </>
          )}

          {activeTab === 'enrolled' && (
            <>
              <h4>Enrolled Clubs</h4>
              <div className="row g-3 mt-3">
                {enrolledClubs.length > 0 ? (
                  enrolledClubs.map((enrolledClub) => renderEnrolledClubCard(enrolledClub))
                ) : (
                  <div className="col-12">
                    <p className="text-muted">You are not enrolled in any clubs.</p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'requests' && (
            <>
              <h4>Enrollment Request Status</h4>
              {enrollmentRequests.length === 0 ? (
                <p className="text-muted">You have not made any enrollment requests.</p>
              ) : (
                <table className="table table-bordered mt-3">
                  <thead>
                    <tr>
                      <th>Club & Category</th>
                      <th>Status</th>
                      <th>Requested On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollmentRequests.map((req) => (
                      <tr key={req._id}>
                        <td>
                          <ul className="mb-0 ps-3">
                            <li>
                              <strong>{req.club?.name || 'Unknown Club'}</strong>
                              <br />
                              <small className="text-muted">Category: {req.category || 'N/A'}</small>
                            </li>
                          </ul>
                        </td>
                        <td>
                          <span
                            className={`badge ${req.status === 'pending'
                              ? 'bg-warning text-dark'
                              : req.status === 'accepted'
                                ? 'bg-success'
                                : 'bg-danger'
                              }`}
                          >
                            {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                          </span>
                          {req.status === 'rejected' && req.message && (
                            <div className="text-danger mt-1 small">{req.message}</div>
                          )}
                        </td>
                        <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
      <CategorySelectModal
        show={showCategoryModal}
        handleClose={() => setShowCategoryModal(false)}
        categories={selectedClubCategories}
        onConfirm={handleConfirmCategory}
      />
    </div>
  );
};

export default StudentDashboard;
