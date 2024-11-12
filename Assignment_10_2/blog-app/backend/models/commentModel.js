const db = require('../db');

// Comments table creation script
const createCommentTable = `
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    user_id INT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
)`;

db.query(createCommentTable, (err) => {
    if (err) throw err;
    console.log('Comments table created');
});

const createComment = (commentData, callback) => {
    const { post_id, user_id, content } = commentData;
    const sql = 'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)';
    db.query(sql, [post_id, user_id, content], callback);
};

const getCommentsByPostId = (postId, callback) => {
    const sql = 'SELECT * FROM comments WHERE post_id = ?';
    db.query(sql, [postId], callback);
};

module.exports = { createComment, getCommentsByPostId };
