const express = require('express');
const { getPosts, createPost } = require('../controllers/postController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, getPosts);
router.post('/', authenticateToken, createPost);

module.exports = router;
