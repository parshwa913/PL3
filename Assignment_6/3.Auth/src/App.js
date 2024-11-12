
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; 
import Login from './components/Login'; 
import Dashboard from './components/Dashboard'; 
import { Container } from '@mui/material';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Container maxWidth="sm">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
                    </Routes>
                </Container>
            </Router>
        </AuthProvider>
    );
};

const ProtectedRoute = ({ component: Component }) => {
    const { isAuthenticated } = useAuth(); 

    return isAuthenticated ? <Component /> : <Login />;
};

export default App;
