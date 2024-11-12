const db = require('../db');

// Posts table creation script
const createPostTable = `
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
)`;

db.query(createPostTable, (err) => {
    if (err) throw err;
    console.log('Posts table created');
});

const createPost = (postData, callback) => {
    const { user_id, title, content } = postData;
    const sql = 'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)';
    db.query(sql, [user_id, title, content], callback);
};

const getPosts = (user_id, callback) => {
    console.log(user_id);
    const sql = `SELECT * FROM posts WHERE user_id = ${user_id}`;
    db.query(sql, callback);
};

const getAllPosts = (user_id, callback) => {
    const sql = 'SELECT * FROM posts';
    db.query(sql, [user_id], callback);
};

const getPostById = (postId, callback) => {
    const sql = 'SELECT * FROM posts WHERE id = ?';
    db.query(sql, [postId], callback);
};

const updatePost = (postId, postData, callback) => {
    const { title, content } = postData;
    const sql = 'UPDATE posts SET title = ?, content = ? WHERE id = ?';
    db.query(sql, [title, content, postId], callback);
};

const deletePost = (postId, callback) => {
    const sql = 'DELETE FROM posts WHERE id = ?';
    db.query(sql, [postId], callback);
};

module.exports = { createPost, getAllPosts, getPosts, getPostById, updatePost, deletePost };
