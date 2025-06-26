import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        setIsLoggedIn(!!token);
        setRole(userRole || '');
    }, [location]);

    const handleLogout = () => {
        localStorage.clear();

        setIsLoggedIn(false);
        setRole('');
        toast.info('Logged out successfully!');
        navigate('/');
    };


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top animated-nav">
            <div className="container">
                <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
                    <img src="logo.png" alt="Logo" width="auto" height="60" />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav ms-auto gap-2">
                        <li className="nav-item">
                            <Link to="/" className="nav-link nav-animate">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/clubs" className="nav-link nav-animate">Clubs</Link>
                        </li>

                        {!isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link nav-animate">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link nav-animate">Register</Link>
                                </li>
                            </>
                        )}

                        {isLoggedIn && (
                            <>
                                {role === 'admin' ? (
                                    <li className="nav-item">
                                        <Link to="/admin" className="nav-link nav-animate">Admin</Link>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <Link to="/dashboard" className="nav-link nav-animate">Dashboard</Link>
                                    </li>
                                )}

                                <li className="nav-item">
                                    <button className="btn btn-outline-danger btn-sm ms-2" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
