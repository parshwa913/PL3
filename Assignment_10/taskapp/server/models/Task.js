const db = require('../config/db');

const Task = {
    create: (userId, title, description, dueDate, status, priority) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO tasks (user_id, title, description, dueDate, status, priority) VALUES (?, ?, ?, ?, ?, ?)', [userId, title, description, dueDate, status, priority], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    },
    getAll: (userId) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM tasks WHERE user_id = ?', [userId], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    },
    update: (id, userId, title, description, dueDate, status, priority) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE tasks SET title = ?, description = ?, dueDate = ?, status = ?, priority = ? WHERE id = ? AND user_id = ?', [title, description, dueDate, status, priority, id, userId], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    },
    delete: (id, userId) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, userId], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    },
};

module.exports = Task;
