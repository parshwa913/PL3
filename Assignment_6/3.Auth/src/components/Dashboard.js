import React from 'react';
import { Typography, Button, Paper, Box } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ height: '100vh', backgroundColor: '#f5f5f5' }}
        >
            <Paper elevation={6} style={{ padding: '40px', borderRadius: '16px', maxWidth: '400px', width: '100%' }}>
                <Typography variant="h4" align="center" marginBottom={2}>Welcome to Your Dashboard</Typography>
                <Button variant="contained" color="secondary" onClick={handleLogout} fullWidth>
                    Logout
                </Button>
            </Paper>
        </Box>
    );
};

export default Dashboard;
