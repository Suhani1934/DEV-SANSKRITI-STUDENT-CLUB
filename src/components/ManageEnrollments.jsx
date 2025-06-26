import { useEffect, useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';

const ManageEnrollments = () => {
    const [requests, setRequests] = useState([]);
    const token = localStorage.getItem('token');

    const fetchRequests = async () => {
        try {
            const res = await api.get('/api/enrollment-requests', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRequests(res.data);
        } catch {
            toast.error('Failed to fetch requests');
        }
    };

    const handleDecision = async (id, decision) => {
        try {
            await axios.put(`/api/enrollment-requests/${id}`, {
                status: decision,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success(`Request ${decision}`);
            fetchRequests();
        } catch {
            toast.error('Failed to update request');
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    return (
        <div className="container">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Email</th>
                        <th>Club</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((req) => (
                        <tr key={req._id}>
                            <td>{req.student?.name}</td>
                            <td>{req.student?.email}</td>
                            <td>{req.club?.name}</td>
                            <td>{req.status}</td>
                            <td>
                                {req.status === 'pending' && (
                                    <>
                                        <button className="btn btn-success btn-sm me-2"
                                            onClick={() => handleDecision(req._id, 'accepted')}>
                                            Accept
                                        </button>
                                        <button className="btn btn-danger btn-sm"
                                            onClick={() => handleDecision(req._id, 'rejected')}>
                                            Reject
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageEnrollments;
