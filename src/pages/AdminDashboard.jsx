import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AddClubModal from "../components/AddClubModal";
import EditClubModal from "../components/EditClubModal";
import DeleteClubModal from "../components/DeleteClubModal";
import ManageEnrollments from "../components/ManageEnrollments";
import ManageStudents from "../components/ManageStudents";
import ManageEvents from "../components/ManageEvents";
import ManageClubDetails from "../components/ManageClubDetails";
import AdminFeedbacks from "../components/AdminFeedback";
import { Spinner } from "react-bootstrap";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [adminName, setAdminName] = useState("");
  const [Role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const [clubs, setClubs] = useState([]);
  const [students, setStudents] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setAdminName(localStorage.getItem("userName") || "Admin");
    setEmail(localStorage.getItem("userEmail") || "");
    setRole(localStorage.getItem("userRole") || "");

    fetchClubs();
    if (activeTab === "students") fetchStudents();

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEmail(res.data.email))
      .catch(() => setEmail("admin@gmail.com"))
      .finally(() => setLoading(false));
  }, [activeTab]);

  const fetchClubs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/clubs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClubs(res.data);
    } catch (err) {
      console.error("Error fetching clubs:", err);
      toast.error("Unauthorized or failed to fetch clubs");
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/students`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStudents(res.data);
    } catch (err) {
      console.error("[FETCH STUDENTS ERROR]", err.response?.data || err.message);
      toast.error("Failed to fetch students");
    }
  };

  return (
    <div className="container-fluid admin-dashboard">
      <div className="row flex-nowrap min-vh-100">
        {/* Sidebar */}
        <div className="col-12 col-md-3 col-lg-2 bg-dark text-light p-3 shadow-lg position-fixed h-100">
          <h4 className="text-warning fw-bold mb-4 text-center">Admin</h4>
          <nav className="d-flex flex-column gap-2">
            {[
              { key: "profile", label: "Profile" },
              { key: "events", label: "Manage Events" },
              { key: "clubs", label: "Manage Clubs" },
              { key: "enrollments", label: "Manage Enrollments" },
              { key: "students", label: "Manage Students" },
              { key: "club-details", label: "Manage Club Details" },
              { key: "feedback", label: "All Feedback" },
            ].map((tab) => (
              <button
                key={tab.key}
                className={`btn rounded-pill fw-semibold transition-all ${
                  activeTab === tab.key
                    ? "btn-warning text-dark shadow-sm"
                    : "btn-outline-warning text-light hover-glow"
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="offset-md-3 offset-lg-2 col py-4 px-4">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <Spinner animation="border" variant="warning" />
            </div>
          ) : (
            <>
              {activeTab === "profile" && (
                <>
                  <h3 className="mb-4 text-primary fw-bold animate__animated animate__fadeIn">
                    Admin Profile
                  </h3>
                  <div className="card p-4 shadow-lg rounded-4 border-0 animate__animated animate__fadeInUp" style={{ maxWidth: "600px" }}>
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src="admin-avtaar.png"
                        alt="Admin"
                        width="100"
                        height="100"
                        className="rounded-circle border border-3 border-warning shadow-sm"
                      />
                      <div className="ms-3">
                        <p className="mb-1"><strong>Name:</strong> {adminName}</p>
                        <p className="mb-0"><strong>Email:</strong> {email}</p>
                      </div>
                    </div>
                    <p><strong>Role:</strong> {Role}</p>
                  </div>
                </>
              )}

              {activeTab === "events" && <ManageEvents />}
              {activeTab === "clubs" && (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="text-primary fw-bold animate__animated animate__fadeIn">Manage Clubs</h3>
                    <button
                      className="btn btn-primary rounded-pill shadow-sm"
                      onClick={() => setShowAddModal(true)}
                    >
                      + Add Club
                    </button>
                  </div>

                  <div className="row g-4 animate__animated animate__fadeInUp">
                    {clubs.map((club) => (
                      <div className="col-12 col-md-6 col-lg-4" key={club._id}>
                        <div className="card h-100 border-0 shadow-lg club-card transition-all position-relative">
                          <img
                            src={`/${club.image}`}
                            alt={club.name}
                            className="card-img-top rounded-top object-fit-cover"
                            style={{ height: "200px" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title fw-bold">{club.name}</h5>
                            <p className="card-text">{club.description?.slice(0, 100)}...</p>
                            <div className="d-flex justify-content-end gap-2 mt-3">
                              <button
                                className="btn btn-outline-primary btn-sm rounded-pill shadow-sm"
                                onClick={() => {
                                  setSelectedClub(club);
                                  setShowEditModal(true);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-outline-danger btn-sm rounded-pill shadow-sm"
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
              {activeTab === "enrollments" && (
                <>
                  <h3 className="mb-4 text-primary fw-bold animate__animated animate__fadeIn">Enrollment Requests</h3>
                  <ManageEnrollments />
                </>
              )}
              {activeTab === "students" && (
                <>
                  <h3 className="mb-4 text-primary fw-bold animate__animated animate__fadeIn">Student List</h3>
                  <ManageStudents />
                </>
              )}
              {activeTab === "club-details" && (
                <>
                  <h3 className="mb-4 text-primary fw-bold animate__animated animate__fadeIn">Manage Club Details</h3>
                  <ManageClubDetails />
                </>
              )}
              {activeTab === "feedback" && (
                <>
                  <h3 className="mb-4 text-primary fw-bold animate__animated animate__fadeIn">All Feedback</h3>
                  <AdminFeedbacks />
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddClubModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        onClubAdded={fetchClubs}
      />
      <EditClubModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        club={selectedClub}
        onClubUpdated={fetchClubs}
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
