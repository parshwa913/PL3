const db = require('../config/db');

class Contact {
    static create(contact, callback) {
        const { user_id, name, phone_number, email, address } = contact;
        db.query('INSERT INTO contacts (user_id, name, phone_number, email, address) VALUES (?, ?, ?, ?, ?)', 
        [user_id, name, phone_number, email, address], callback);
    }

    static findAll(userId, page, limit, callback) {
        const offset = (page - 1) * limit;
        db.query('SELECT * FROM contacts WHERE user_id = ? LIMIT ? OFFSET ?', 
        [userId, limit, offset], callback);
    }

    static findById(id, userId, callback) {
        db.query('SELECT * FROM contacts WHERE id = ? AND user_id = ?', [id, userId], callback);
    }

    static update(id, userId, contact, callback) {
        const { name, phone_number, email, address } = contact;
        db.query('UPDATE contacts SET name = ?, phone_number = ?, email = ?, address = ? WHERE id = ? AND user_id = ?', 
        [name, phone_number, email, address, id, userId], callback);
    }

    static delete(id, userId, callback) {
        db.query('DELETE FROM contacts WHERE id = ? AND user_id = ?', [id, userId], callback);
    }

    static search(userId, query, callback) {
        db.query('SELECT * FROM contacts WHERE user_id = ? AND (name LIKE ? OR email LIKE ?)', 
        [userId, `%${query}%`, `%${query}%`], callback);
    }
}

module.exports = Contact;
