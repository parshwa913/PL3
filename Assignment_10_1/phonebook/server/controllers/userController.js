// server/controllers/userController.js
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // SQL query to insert a new user
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const [result] = await db.query(sql, [username, email, hashedPassword]);

        // Return the created user info
        res.status(201).json({ id: result.insertId, username });
    } catch (err) {
        console.error('Error registering user:', err);
        // Check for specific database errors (like unique constraints)
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'User with this email or username already exists.' });
        }
        res.status(500).json({ error: 'Database error' });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // SQL query to find the user by email
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [results] = await db.query(sql, [email]);

        // If no user is found, return unauthorized
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = results[0];
        // Compare the provided password with the stored hash
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return the token to the user
        res.json({ token });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Database error' });
    }
};
