import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState('');
    const [scrolled, setScrolled] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('userRole');
        setIsLoggedIn(!!token);
        setRole(userRole || '');
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setRole('');
        toast.info('Logged out successfully!');
        navigate('/');
    };

    return (
        <nav className={`navbar navbar-expand-lg navbar-dark sticky-top shadow animated-navbar ${scrolled ? 'navbar-shrink' : ''}`}>
            <div className="container py-2">
                <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
                    <img src="DSVV_LOGO_BLACK.png" alt="Logo" height="50" />
                </Link>

                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3 mt-3 mt-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link nav-animated-link">
                                <i className="bi bi-house-fill me-1"></i>Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/clubs" className="nav-link nav-animated-link">
                                <i className="bi bi-people-fill me-1"></i>Clubs
                            </Link>
                        </li>

                        {!isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link nav-animated-link">
                                        <i className="bi bi-box-arrow-in-right me-1"></i>Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link nav-animated-link">
                                        <i className="bi bi-pencil-square me-1"></i>Register
                                    </Link>
                                </li>
                            </>
                        )}

                        {isLoggedIn && (
                            <>
                                {role === 'admin' ? (
                                    <li className="nav-item">
                                        <Link to="/admin" className="nav-link nav-animated-link">
                                            <i className="bi bi-speedometer2 me-1"></i>Admin
                                        </Link>
                                    </li>
                                ) : (
                                    <li className="nav-item">
                                        <Link to="/dashboard" className="nav-link nav-animated-link">
                                            <i className="bi bi-person-circle me-1"></i>Dashboard
                                        </Link>
                                    </li>
                                )}

                                <li className="nav-item">
                                    <button className="btn btn-warning btn-sm ms-lg-3 mt-2 mt-lg-0 d-flex align-items-center gap-1" onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-right"></i>Logout
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
