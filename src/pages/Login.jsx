import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('${import.meta.env.VITE_API_URL}/api/auth/login', {
                email: form.email,
                password: form.password
            });

            const { token, user } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('userRole', user.role);
            localStorage.setItem('userName', user.name);
            localStorage.setItem('user', JSON.stringify(user));

            toast.success(`Welcome back, ${user.name}`);

            // Role-based redirection
            if (user.role === 'admin') {
                navigate('/admin');
            } else if(user.role === 'student'){
                navigate('/welcome');
            }
        } catch (err) {
            console.error('[LOGIN ERROR]', err);
            console.log('err.response:', err.response);
            toast.error(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-primary text-center mb-4">Login</h2>
            <form className="card p-4 shadow-lg rounded-4" onSubmit={handleSubmit}>
                <input className="form-control mb-3" placeholder="Email" name="email" type="email" onChange={handleChange} required />
                <input className="form-control mb-3" placeholder="Password" name="password" type="password" onChange={handleChange} required />
                <button className="btn btn-warning w-100">Login</button>
            </form>
        </div>
    );
}

export default Login;
