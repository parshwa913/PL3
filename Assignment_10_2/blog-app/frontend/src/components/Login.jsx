import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        API.post('/auth/login', { email, password })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.user.id);
                navigate('/');
            })
            .catch((error) => console.error('Login failed', error));
    };

    return (
        <div className="container mx-auto p-4 font-figtree">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                        placeholder="Enter your password"
                    />
                </div>
                {/* Add new user registration link */}
                <a href="/register" className="text-blue-500">New user? Register here</a>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
