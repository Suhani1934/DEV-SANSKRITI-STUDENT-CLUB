import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-5 text-white">
            <div className="container">
                <div className="row align-items-center">

                    {/* Logo and About */}
                    <div className="col-md-4 mb-4 mb-md-0 text-center text-md-start">
                        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
                            <img src="DSVV_LOGO_WHITE.png" alt="University Logo" className="footer-logo mb-2" />
                        </Link>
                        <p className="small">Empowering students through creativity and collaboration at our vibrant university clubs.</p>
                    </div>

                    {/* Website Links */}
                    <div className="col-md-4 mb-4 mb-md-0 text-center">
                        <h5 className="mb-3 text-yellow">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="footer-link">Home</Link></li>
                            <li><Link to="/clubs" className="footer-link">Clubs</Link></li>
                            <li><Link to="/login" className="footer-link">Login</Link></li>
                            <li><Link to="/register" className="footer-link">Register</Link></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="col-md-4 text-center text-md-end">
                        <h5 className="mb-3 text-yellow">Connect with us</h5>
                        <div className="d-flex justify-content-center justify-content-md-end gap-3">
                            <a href="https://www.facebook.com/dsvvofficial/" className="social-icon"><i className="bi bi-facebook"></i></a>
                            <a href="https://x.com/dsvvofficial" className="social-icon"><i className="bi bi-twitter"></i></a>
                            <a href="https://youtube.com/@devsanskritivishwavidyalay4081?si=njop_1bOkVZyFFN" className="social-icon"><i className="bi bi-youtube"></i></a>
                            <a href="https://www.instagram.com/dsvvofficial?igsh=MTBhYjNqMHluZ3ZqNQ==" className="social-icon"><i className="bi bi-instagram"></i></a>
                            <a href="https://www.linkedin.com/company/devsanskritivishwavidyalya" className="social-icon"><i className="bi bi-linkedin"></i></a>
                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <div className="text-center pt-4 mt-4 border-top border-yellow small">
                    &copy; {new Date().getFullYear()} Dev sanskriti Student's Club. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
