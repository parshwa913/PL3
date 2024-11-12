const postModel = require('../models/postModel');

const getAllPosts = (req, res) => {
    postModel.getAllPosts((err, posts) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(posts);
    });
};

module.exports = { getAllPosts };
