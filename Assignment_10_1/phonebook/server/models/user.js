const db = require('../config/db');

class User {
    static create(username, password, email, callback) {
        db.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', 
        [username, password, email], callback);
    }

    static findByUsername(username, callback) {
        db.query('SELECT * FROM users WHERE username = ?', [username], callback);
    }
}

module.exports = User;
