const express = require('express');
const { getAllPosts } = require('../controllers/allPostController');

const router = express.Router();

router.get('/', getAllPosts);

module.exports = router;
