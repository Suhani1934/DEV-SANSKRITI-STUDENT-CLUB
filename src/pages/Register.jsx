import { useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import courses from '../data/courses';

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

    // Password pattern validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

    if (!form.password || !passwordRegex.test(form.password)) {
      newErrors.password =
        'Password must be at least 8 characters, include uppercase, lowercase, number, and special character';
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
      const res = await  api.post('/api/auth/register', form);
      toast.success(res.data.message);
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Student Registration</h3>
      <form onSubmit={handleSubmit} className="col-md-6 mx-auto border p-4 rounded shadow bg-white">

        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className={`form-control ${errors.name && 'is-invalid'}`}
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className={`form-control ${errors.email && 'is-invalid'}`}
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className={`form-control ${errors.phone && 'is-invalid'}`}
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        {/* Course */}
        <div className="mb-3">
          <label className="form-label">Course</label>
          <select
            className={`form-select ${errors.course && 'is-invalid'}`}
            name="course"
            value={form.course}
            onChange={handleChange}
          >
            <option value="">-- Select Course --</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
          {errors.course && <div className="invalid-feedback">{errors.course}</div>}
        </div>

        {/* Year */}
        <div className="mb-3">
          <label className="form-label">Year</label>
          <select
            className={`form-select ${errors.year && 'is-invalid'}`}
            name="year"
            value={form.year}
            onChange={handleChange}
          >
            <option value="">-- Select Year --</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.year && <div className="invalid-feedback">{errors.year}</div>}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password && 'is-invalid'}`}
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword && 'is-invalid'}`}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">Register</button>

        <p className="mt-3 text-center">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
