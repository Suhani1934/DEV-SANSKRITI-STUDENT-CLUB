import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRouteStudent = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.warn('❌ No token found. Redirecting to login.');
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    console.log('🔐 Decoded Token:', decoded);

    if (decoded.role === 'student') {
      return children;
    } else {
      console.warn('🚫 Not a student. Redirecting...');
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error('❌ Token decode failed:', error);
    return <Navigate to="/login" />;
  }
};

export default ProtectedRouteStudent;
