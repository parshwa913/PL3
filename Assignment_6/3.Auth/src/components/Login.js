import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard'); 
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'ryan' && password === 'reynolds') {
            login();
            navigate('/dashboard');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{
                height: '100vh',
                background: 'linear-gradient(135deg, #A8E0FF, #FFB6D9)',
            }}
        >
            <Paper elevation={6} style={{ padding: '40px', borderRadius: '16px', maxWidth: '400px', width: '100%' }}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h4" align="center" marginBottom={2}>Login</Typography>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;
