const postModel = require('../models/postModel');

const getPosts = (req, res) => {
    console.log(req.query.user_id);
    postModel.getPosts(req.query.user_id, (err, posts) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(posts);
    });
};

const createPost = (req, res) => {
    const { user_id, title, content } = req.body;

    postModel.createPost({ user_id, title, content }, (err, result) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.status(201).json({ message: 'Post created' });
    });
};

module.exports = { getPosts, createPost };
