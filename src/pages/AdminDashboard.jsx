import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddClubModal from '../components/AddClubModal';
import EditClubModal from '../components/EditClubModal';
import DeleteClubModal from '../components/DeleteClubModal';
import ManageEnrollments from '../components/ManageEnrollments';
import ManageStudents from '../components/ManageStudents';

import AdminSidebar from '../components/AddClubModal'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [adminName, setAdminName] = useState('');
  const [Role, setRole] = useState('');
  const [email, setEmail] = useState('');

  const [clubs, setClubs] = useState([]);
  const [students, setStudents] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    setAdminName(localStorage.getItem('userName') || 'Admin');
    setEmail(localStorage.getItem('userEmail') || '');
    setRole(localStorage.getItem('userRole') || '');

    fetchClubs();

    if (activeTab === 'students') fetchStudents();

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEmail(res.data.email);
      })
      .catch(() => {
        setEmail('admin@gmail.com');
      });
  }, [activeTab]);

  const fetchClubs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/clubs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClubs(res.data);
    } catch (err) {
      console.error('Error fetching clubs:', err);
      toast.error('Unauthorized or failed to fetch clubs');
    }
  };


  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/students`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStudents(res.data);
    } catch (err) {
      console.error('[FETCH STUDENTS ERROR]', err.response?.data || err.message);
      toast.error('Failed to fetch students');
    }
  };

  // const handleDeleteStudent = async (id) => {
  //   if (!window.confirm('Are you sure you want to delete this student?')) return;
  //   try {
  //     await axios.delete(`${import.meta.env.VITE_API_URL}/api/students/${id}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     toast.success('Student deleted');
  //     fetchStudents();
  //   } catch (err) {
  //     toast.error('Failed to delete student');
  //   }
  // };


  return (
    <div className="container-fluid">
      <div className="row vh-100">

        {/* Sidebar */}
        <div className="col-md-3 bg-light border-end p-3">
          <h5 className="text-primary fw-bold mb-4">Admin Dashboard</h5>
          <div className="d-flex flex-column gap-3">
            <button
              className={`btn ${activeTab === 'profile' ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`btn ${activeTab === 'clubs' ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={() => setActiveTab('clubs')}
            >
              Manage Clubs
            </button>
            <button
              className={`btn ${activeTab === 'enrollments' ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={() => setActiveTab('enrollments')}
            >
              Manage Enrollments
            </button>

            <button
              className={`btn ${activeTab === 'students' ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={() => setActiveTab('students')}
            >
              Manage Students
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 p-4 overflow-auto">

          {activeTab === 'profile' && (
            <>
              <h4>Admin Profile</h4>
              <div className="card p-4 shadow-sm" style={{ maxWidth: '600px' }}>
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="admin-avtaar.png"
                    alt="Admin"
                    width="100"
                    height="100"
                    className="rounded-circle border"
                  />
                  <div className="ms-3">
                    <p><strong>Name:</strong> {adminName}</p>
                    <p><strong>Email:</strong> {email}</p>
                  </div>
                </div>
                <p><strong>Role:</strong> {Role}</p>
              </div>
            </>
          )}

          {activeTab === 'clubs' && (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Manage Club</h4>
                <button className="btn btn-sm btn-primary" onClick={() => setShowAddModal(true)}>
                  + Add Club
                </button>
              </div>

              <div className="row g-3">
                {clubs.map((club) => (
                  <div className="col-md-6 col-lg-4" key={club._id}>
                    <div className="card shadow-sm h-100">
                      <img
                        src={`/${club.image}`}
                        alt={club.name}
                        className="card-img-top"
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{club.name}</h5>
                        <p className="card-text">{club.description?.slice(0, 80)}...</p>
                        <p className="text-muted"><strong>Category:</strong> {club.category || 'N/A'}</p>

                        <div className="d-flex justify-content-end gap-2 mt-3">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => {
                              setSelectedClub(club);
                              setShowEditModal(true);
                            }}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => {
                              setSelectedClub(club);
                              setShowDeleteModal(true);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}


          {activeTab === 'enrollments' && (
            <>
              <h4>Enrollment Requests</h4>
              <ManageEnrollments />
            </>
          )}

          {activeTab === 'students' && (
            <>
              <h4>Student List</h4>
              <ManageStudents />
            </>
          )}

        </div>
      </div>

      {/* Modals */}
      <AddClubModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        refreshClubs={fetchClubs}
      />

      <EditClubModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        club={selectedClub}
        refreshClubs={fetchClubs}
      />

      <DeleteClubModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        clubId={selectedClub?._id}
        refreshClubs={fetchClubs}
      />

    </div>
  );
};

export default AdminDashboard;
