require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const allPostRoute = require('./routes/allPostRoute');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/allPosts', allPostRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
