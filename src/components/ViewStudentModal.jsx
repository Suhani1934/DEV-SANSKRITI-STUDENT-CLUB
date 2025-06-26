import React, { useEffect, useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const ViewStudentModal = ({ show, handleClose, studentId }) => {
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (studentId) {
            fetchStudentDetails();
        }
    }, [studentId]);

    const fetchStudentDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/users/students/${studentId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setStudent(res.data);
        } catch (err) {
            toast.error('Failed to fetch student details');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Student Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" />
                    </div>
                ) : student ? (
                    <>
                        <p><strong>Name:</strong> {student.name}</p>
                        <p><strong>Email:</strong> {student.email}</p>
                        <p><strong>Role:</strong> {student.role}</p>

                        <hr />
                        <h5>Enrolled Clubs</h5>
                        {student.enrolledClubs && student.enrolledClubs.length > 0 ? (
                            <ul className="list-group">
                                {student.enrolledClubs.map((club) => (
                                    <li key={club._id} className="list-group-item">
                                        <strong>{club.name}</strong> — <em>{club.category}</em>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>This student has not enrolled in any clubs.</p>
                        )}
                    </>
                ) : (
                    <p>Student not found.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewStudentModal;
