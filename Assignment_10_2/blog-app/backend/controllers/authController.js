const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Temporary in-memory OTP store (use a database in production)
let otpStore = {};

// Email configuration for sending OTPs
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER, // Add your email credentials in the .env
        pass: process.env.EMAIL_PASS
    }
});

// Send OTP function
const sendOtpEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify your Email - OTP',
        text: `Your OTP is: ${otp}`
    };

    return transporter.sendMail(mailOptions);
};

// Register function with OTP generation and email sending
const register = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);

    // Check if user already exists
    userModel.findUserByEmail(email, async (err, users) => {
        if (err || users.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Generate and send OTP
        const otp = crypto.randomInt(100000, 999999); // 6-digit OTP
        otpStore[email] = { otp, expiresIn: Date.now() + 10 * 60 * 1000 }; // OTP valid for 10 mins

        try {
            await sendOtpEmail(email, otp);
            return res.status(200).json({ message: 'OTP sent to your email' });
        } catch (error) {
            return res.status(500).json({ error: 'Error sending OTP' });
        }
    });
};

// Verify OTP and complete user registration
const verifyOtp = async (req, res) => {
    const { username, email, password, otp } = req.body;

    // Check if OTP matches and is not expired
    const storedOtp = otpStore[email];
    if (!storedOtp || storedOtp.otp !== parseInt(otp) || storedOtp.expiresIn < Date.now()) {
        return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Hash password and create user
    const hashedPassword = await bcryptjs.hash(password, 10);

    userModel.createUser({ username, email, password: hashedPassword }, (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        
        // Remove OTP from store after successful registration
        delete otpStore[email];
        res.status(201).json({ message: 'User created successfully' });
    });
};

// Login function
const login = (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    userModel.findUserByEmail(email, async (err, users) => {
        if (err || users.length === 0) return res.status(400).json({ error: 'Invalid credentials' });

        const user = users[0];
        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user.id, username: user.username } });
    });
};

module.exports = { register, verifyOtp, login };
