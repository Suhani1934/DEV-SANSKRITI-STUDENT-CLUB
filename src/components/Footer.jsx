import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // ensure bootstrap-icons installed
import './Footer.css'; // for extra styling

const Footer = () => {
    return (
        <footer className="footer mt-auto py-5 text-white">
            <div className="container">
                <div className="row align-items-center">

                    {/* Logo and About */}
                    <div className="col-md-4 mb-4 mb-md-0 text-center text-md-start">
                        <img src="/university-logo.png" alt="University Logo" className="footer-logo mb-2" />
                        <p className="small">Empowering students through creativity and collaboration at our vibrant university clubs.</p>
                    </div>

                    {/* Website Links */}
                    <div className="col-md-4 mb-4 mb-md-0 text-center">
                        <h5 className="mb-3 text-yellow">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="footer-link">Home</a></li>
                            <li><a href="/clubs" className="footer-link">Clubs</a></li>
                            <li><a href="/login" className="footer-link">Login</a></li>
                            <li><a href="/register" className="footer-link">Register</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="col-md-4 text-center text-md-end">
                        <h5 className="mb-3 text-yellow">Connect with us</h5>
                        <div className="d-flex justify-content-center justify-content-md-end gap-3">
                            <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="social-icon"><i className="bi bi-twitter"></i></a>
                            <a href="#" className="social-icon"><i className="bi bi-instagram"></i></a>
                            <a href="#" className="social-icon"><i className="bi bi-linkedin"></i></a>
                        </div>
                    </div>

                </div>

                {/* Copyright */}
                <div className="text-center pt-4 mt-4 border-top border-yellow small">
                    &copy; {new Date().getFullYear()} University Clubs Portal. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
