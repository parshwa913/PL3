import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // Step 1: Register, Step 2: OTP Verification
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle registration and OTP sending
  const handleRegister = (e) => {
    e.preventDefault();
    API.post('/auth/register', { username, email, password })
      .then((response) => {
        alert('OTP sent to your email');
        setStep(2); // Proceed to OTP verification step
      })
      .catch((error) => {
        // Check for duplicate user error and set the error message accordingly
        if (error.response && error.response.status === 400 && error.response.data.error === 'User already exists') {
          setError('This email is already registered. Please use a different email.');
        } else {
          console.error('Error in registration', error);
          setError('An error occurred during registration. Please try again.');
        }
      });
  };

  // Handle OTP verification
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    API.post('/auth/verify-otp', { username, email, password, otp })
      .then((response) => {
        alert('Registration successful');
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error verifying OTP', error);
        setError('Invalid OTP');
      });
  };

  return (
    <div className="container mx-auto p-4 font-figtree">
      <h1 className="text-3xl font-bold mb-4">Register</h1>

      {step === 1 && (
        <form onSubmit={handleRegister} className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter your username"
            />
          </div>
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
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Register
          </button>
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter the OTP sent to your email"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Verify OTP
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      )}

      {step === 1 && (
        <a href="/login" className="text-blue-500">Already Registered? Login here</a>
      )}
    </div>
  );
};

export default Register;
