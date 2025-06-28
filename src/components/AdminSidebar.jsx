const AdminSidebar = ({ activeTab, setActiveTab }) => {
    return (
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
    );
};

export default AdminSidebar;
