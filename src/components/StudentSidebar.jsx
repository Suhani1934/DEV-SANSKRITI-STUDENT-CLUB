const StudentSidebar = ({ activeTab, setActiveTab }) => {
    return (
        <div className="bg-light p-3 h-100 border-end shadow-sm">
            <h5 className="text-primary fw-bold mb-4">Dashboard</h5>

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
                    Clubs
                </button>

                <button
                    className={`btn ${activeTab === 'enrolled' ? 'btn-warning' : 'btn-outline-warning'}`}
                    onClick={() => setActiveTab('enrolled')}
                >
                    Enrolled Clubs
                </button>

                <button
                    className={`btn ${activeTab === 'requests' ? 'btn-warning' : 'btn-outline-warning'}`}
                    onClick={() => setActiveTab('requests')}
                >
                    Request History
                </button>

            </div>
        </div>
    );
};

export default StudentSidebar;
