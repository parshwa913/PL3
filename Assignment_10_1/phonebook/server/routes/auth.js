const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

router.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    User.create(username, hashedPassword, email, (err, result) => {
        if (err) return res.status(500).send("User registration failed.");
        res.status(201).send({ message: "User registered successfully." });
    });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, user) => {
        if (err || !user.length) return res.status(404).send("User not found.");
        const isValid = bcrypt.compareSync(password, user[0].password);
        if (!isValid) return res.status(401).send("Invalid password.");

        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).send({ auth: true, token });
    });
});

module.exports = router;
