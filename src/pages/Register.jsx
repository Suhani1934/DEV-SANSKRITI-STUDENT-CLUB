import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import courses from '../data/courses';
import './Register.css';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    year: '',
    role: 'student',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email is required';
    if (!form.phone || !/^[0-9]{10}$/.test(form.phone)) newErrors.phone = 'Valid 10-digit phone number required';
    if (!form.course) newErrors.course = 'Please select a course';
    if (!form.year) newErrors.year = 'Please select a year';

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
    if (!form.password || !passwordRegex.test(form.password)) {
      newErrors.password = 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character';
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, form);
      toast.success(res.data.message);
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center">
      <div className="card register-card shadow-lg rounded-4 p-4 w-100" style={{ maxWidth: '500px' }}>
        <div className="text-center mb-4">
          <img src="registration.png" alt="Logo" className="register-logo mb-2" />
          <h3 className="text-accent fw-bold">Create Account</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
            <input type="text" className={`form-control ${errors.name && 'is-invalid'}`} name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
            <input type="email" className={`form-control ${errors.email && 'is-invalid'}`} name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text"><i className="bi bi-telephone-fill"></i></span>
            <input type="text" className={`form-control ${errors.phone && 'is-invalid'}`} name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>

          <div className="mb-3">
            <select className={`form-select ${errors.course && 'is-invalid'}`} name="course" value={form.course} onChange={handleChange}>
              <option value="">-- Select Course --</option>
              {courses.sort().map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
            {errors.course && <div className="invalid-feedback">{errors.course}</div>}
          </div>

          <div className="mb-3">
            <select className={`form-select ${errors.year && 'is-invalid'}`} name="year" value={form.year} onChange={handleChange}>
              <option value="">-- Select Year --</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {errors.year && <div className="invalid-feedback">{errors.year}</div>}
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
            <input type="password" className={`form-control ${errors.password && 'is-invalid'}`} name="password" placeholder="Password" value={form.password} onChange={handleChange} />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <div className="input-group mb-4">
            <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
            <input type="password" className={`form-control ${errors.confirmPassword && 'is-invalid'}`} name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>

          <button type="submit" className="btn btn-yellow w-100 py-2 fw-bold d-flex justify-content-center align-items-center gap-2">
            <i className="bi bi-person-plus-fill"></i> Register
          </button>

          <p className="mt-3 text-center">
            Already have an account? <Link to="/login" className="text-accent">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
