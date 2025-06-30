import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
// import ProtectedRouteStudent from './components/ProtectedRouteStudent';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
// import ClubCard from './components/clubCard';

import Footer from './components/Footer';

import RoleBasedRoute from './components/RoleBasedRoute';
import { isTokenExpired } from './utils/auth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenExpired(token)) {
      localStorage.clear();
      toast.error('Session expired. Please login again.');
      navigate('/login');
    }
  }, [location]);


  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <ToastContainer position="bottom-left" autoClose={2000} />
      <main className='flex-grow-1'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/welcome"
            element={
              <Welcome />
            }
          />

          {/* <Route path="/clubs" element={<ClubCard />} /> */}

          {/* Student-only route */}
          <Route
            path="/dashboard"
            element={
              <RoleBasedRoute allowedRole="student">
                <StudentDashboard />
              </RoleBasedRoute>
            }
          />
          {/* <Route path="/club-details" element={<RoleBasedRoute allowedRole="student">
          <ClubDetails />
        </RoleBasedRoute>} /> */}

          {/* Admin-only route */}
          <Route
            path="/admin"
            element={
              <RoleBasedRoute allowedRole="admin">
                <AdminDashboard />
              </RoleBasedRoute>
            }
          />

          {/* 404 Page Not Found */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
