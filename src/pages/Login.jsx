import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email: form.email,
        password: form.password,
      });

      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success(`Welcome back, ${user.name}`);

      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'student') {
        navigate('/welcome');
      }
    } catch (err) {
      console.error('[LOGIN ERROR]', err);
      toast.error(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="card login-card p-4 shadow rounded-4 w-100" style={{ maxWidth: '420px' }}>
        <div className="text-center mb-4">
          <img src="login.png" alt="Logo" className="login-logo mb-2" />
          <h3 className="text-accent fw-bold">Welcome Back</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bi bi-envelope-fill"></i>
            </span>
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              type="email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group mb-4">
            <span className="input-group-text">
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              className="form-control"
              placeholder="Password"
              name="password"
              type="password"
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-yellow w-100 py-2 fw-bold d-flex justify-content-center align-items-center gap-2">
            <i className="bi bi-box-arrow-in-right"></i> Login
          </button>
          <p className="mt-3 text-center">
            Don't Have An Account? <Link to="/register" className="text-accent">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
