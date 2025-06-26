import React from 'react';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
    return (
        <div className="bg-light p-3 h-100 border-end shadow-sm">
            <h5 className="text-primary fw-bold mb-4">Admin Panel</h5>

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
                    className={`btn ${activeTab === 'clubs' ? 'btn-warning' : 'btn-outline-warning'}`}
                    onClick={() => setActiveTab('clubs')}
                >
                    Manage Clubs
                </button>
                <button
                    className={`btn w-100 text-start mb-2 ${activeTab === 'enrollments' ? 'btn-warning' : 'btn-outline-warning'}`}
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
