import { useEffect, useState } from 'react';
import api from '../api';
import StudentSidebar from '../components/StudentSidebar';
import StudentProfile from '../components/StudentProfile';
import ClubDetailModal from '../components/ClubDetailModal';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [student, setStudent] = useState({});

  const [clubs, setClubs] = useState([]);
  const [enrolledClubIds, setEnrolledClubIds] = useState([]);
  const [enrolledClubs, setEnrolledClubs] = useState([]);

  const [enrollmentRequests, setEnrollmentRequests] = useState([]);


  const [requestedClubIds, setRequestedClubIds] = useState([]);


  // const [selectedClub, setSelectedClub] = useState(null);
  // const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    setName(localStorage.getItem('userName') || '');
    setEmail(localStorage.getItem('userEmail') || '');
    fetchClubs();
    fetchStudent();
    fetchRequestedClubIds();
    fetchEnrollmentRequests();
    // fetchEnrolledClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const res = await api.get('/api/clubs');
      setClubs(res.data);
    } catch {
      toast.error('Failed to load clubs');
    }
  };

  const fetchStudent = async () => {
    try {
      const res = await api.get('/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const clubIds = res.data.enrolledClubs.map((club) => club._id);
      setEnrolledClubIds(clubIds);
      setEnrolledClubs(res.data.enrolledClubs);
      setStudent(res.data);
    } catch {
      toast.error('Failed to fetch student info');
    }
  };

  const fetchEnrolledClubs = async () => {
    try {
      const res = await api.get('/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const clubIds = res.data.enrolledClubs.map((club) => club._id);
      setEnrolledClubIds(clubIds);
    } catch {
      toast.error('Failed to fetch your enrollments');
    }
  };

  const fetchRequestedClubIds = async () => {
    try {
      const res = await api.get(`/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const res2 = await api.get(`/api/enrollment-requests/my-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const studentRequests = res2.data.filter(
        (req) => req.student._id === res.data._id && req.status === 'pending'
      );
      const ids = studentRequests.map((r) => r.club._id);
      setRequestedClubIds(ids);
    } catch {
      toast.error('Failed to load requested clubs');
    }
  };

  const fetchEnrollmentRequests = async () => {
    try {
      const res = await api.get('/api/enrollment-requests/my-requests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEnrollmentRequests(res.data);
    } catch {
      toast.error('Failed to fetch request history');
    }
  };

  const handleRequestEnroll = async (clubId, categories) => {
    const selected = window.prompt(`Select category: ${categories.join(', ')}`);
    if (!selected || !categories.includes(selected)) {
      toast.error('Invalid category selected!');
      return;
    }

    try {
      await  api.post(`/api/enrollment-requests/${clubId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Enrollment request sent!');
      fetchRequestedClubIds();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to send request');
    }
  };


  const handleUnenroll = async (clubId) => {
    try {
      await axios.delete(`/api/enroll/unenroll/${clubId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Unenrolled successfully!');
      fetchEnrolledClubs(); // Refresh list
    } catch (err) {
      toast.error(err.response?.data?.error || 'Unenrollment failed');
    }
  };


  const renderClubCard = (club) => (
    <div className="col-md-6 col-lg-4" key={club._id}>
      <div className="card h-100 shadow-sm">
        <img
          src={`/${club.image}`}
          className="card-img-top"
          alt={club.name}
          style={{ height: '180px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{club.name}</h5>
          <p className="card-text">{club.description?.slice(0, 100)}...</p>

          {enrolledClubIds.includes(club._id) ? (
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleUnenroll(club._id)}
            >
              Unenroll
            </button>
          ) : requestedClubIds.includes(club._id) ? (
            <button className="btn btn-secondary btn-sm" disabled>
              Requested
            </button>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => handleRequestEnroll(club._id, categories)}
            >
              Click here to Enroll
            </button>
          )}


        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-md-3 p-0">
          <StudentSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="col-md-9 p-4 overflow-auto">
          {activeTab === 'profile' && (
            <>
              <h4>Student Profile</h4>
              <StudentProfile student={student} />
            </>
          )}

          {activeTab === 'clubs' && (
            <>
              <h4>Clubs</h4>
              <div className="row g-3 mt-3">
                {clubs.map(club => renderClubCard(club))}
              </div>
            </>
          )}

          {activeTab === 'enrolled' && (
            <>
              <h4>Enrolled Clubs</h4>
              <div className="row g-3 mt-3">
                {enrolledClubs.length > 0 ? (
                  enrolledClubs.map((club) => renderClubCard(club))
                ) : (
                  <p className="text-muted">You are not enrolled in any clubs.</p>
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
                      <th>Club</th>
                      <th>Status</th>
                      <th>Requested On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollmentRequests.map((req) => (
                      <tr key={req._id}>
                        <td>{req.club?.name}</td>
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
    </div>
  );
};

export default StudentDashboard;
