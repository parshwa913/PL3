import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // To display error messages

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            
            // Store token in localStorage for later use
            const token = response.data.token;
            setToken(token);
            localStorage.setItem('token', token);

            // Redirect or update the UI after successful login
            console.log('Login successful');
        } catch (error) {
            // Handle various error scenarios
            if (error.response && error.response.status === 400) {
                setErrorMessage('Invalid username or password');
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
            console.error('Error logging in', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error messages */}
        </div>
    );
};

export default Login;




/* import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            setToken(response.data.token);
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
 */