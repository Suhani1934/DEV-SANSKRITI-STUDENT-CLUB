import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaRegIdCard } from 'react-icons/fa';

const StudentProfile = ({ student }) => {
    if (!student || !student.role) return null;

    const { name = '', email = '', phone = '', course = '', year = '', role = '' } = student || {};


    return (
        <div className="card p-4 shadow-lg rounded-4 border-0 bg-light">
            <div className="card-body">
                <div className="row gy-3">
                    <ProfileItem icon={<FaUser />} label="Name" value={name} />
                    <ProfileItem icon={<FaEnvelope />} label="Email" value={email} />
                    <ProfileItem icon={<FaPhone />} label="Phone" value={phone} />
                    <ProfileItem icon={<FaGraduationCap />} label="Course" value={course} />
                    <ProfileItem icon={<FaRegIdCard />} label="Year" value={year} />
                </div>
            </div>
        </div>
    );
};

const ProfileItem = ({ icon, label, value }) => (
    <div className="col-md-6">
        <div className="bg-white p-3 rounded shadow-sm d-flex align-items-center gap-3 border-start border-4 border-warning">
            <span className="fs-4 text-warning">{icon}</span>
            <div>
                <div className="fw-semibold text-secondary">{label}</div>
                <div className="fw-bold text-dark">{value}</div>
            </div>
        </div>
    </div>
);

export default StudentProfile;
