import { Navigate } from 'react-router-dom';

const RoleBasedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');

  if (!token) return <Navigate to="/login" replace />;
  if (role !== allowedRole) return <Navigate to="/" replace />;

  return children;
};

export default RoleBasedRoute;
