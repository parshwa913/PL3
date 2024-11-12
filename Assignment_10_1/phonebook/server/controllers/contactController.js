// server/controllers/contactController.js
const db = require('../config/db'); // Ensure this points to your database config
const csv = require('csv-parser'); // For CSV import
const fs = require('fs'); // For file system operations
const { Parser } = require('json2csv'); // For CSV export

// Get all contacts with pagination
exports.getContacts = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit of 10 contacts per page
    const offset = (page - 1) * limit;

    const sql = 'SELECT * FROM contacts LIMIT ?, ?';
    try {
        const [results] = await db.query(sql, [parseInt(offset), parseInt(limit)]);
        res.json(results);
    } catch (err) {
        console.error('Error retrieving contacts:', err);
        return res.status(500).json({ error: 'Database error while retrieving contacts' });
    }
};

// Search contacts by name or email
exports.searchContacts = async (req, res) => {
    const { query } = req.query;

    const sql = 'SELECT * FROM contacts WHERE name LIKE ? OR email LIKE ?';
    const searchQuery = `%${query}%`;
    try {
        const [results] = await db.query(sql, [searchQuery, searchQuery]);
        res.json(results);
    } catch (err) {
        console.error('Error searching contacts:', err);
        return res.status(500).json({ error: 'Database error while searching contacts' });
    }
};

exports.addContact = async (req, res) => {
    console.log("Received data:", req.body);  // Log the received data
    const { name, phone_number, email, address, user_id } = req.body;

    if (!name || !phone_number || !email || !address || !user_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'INSERT INTO contacts (name, phone_number, email, address, user_id) VALUES (?, ?, ?, ?, ?)';
    
    try {
        const [result] = await db.query(sql, [name, phone_number, email, address, user_id]);
        res.status(201).json({ id: result.insertId, name, phone_number, email, address, user_id });
    } catch (err) {
        console.error('Error adding contact:', err);
        return res.status(500).json({ error: 'Database error while adding contact' });
    }
};

// Update a contact
exports.updateContact = async (req, res) => {
    const { id } = req.params;
    const { name, phone_number, email, address } = req.body;

    const sql = 'UPDATE contacts SET name = ?, phone_number = ?, email = ?, address = ? WHERE id = ?';
    try {
        await db.query(sql, [name, phone_number, email, address, id]);
        res.status(200).json({ message: 'Contact updated successfully' });
    } catch (err) {
        console.error('Error updating contact:', err);
        return res.status(500).json({ error: 'Database error while updating contact' });
    }
};

// Delete a contact
exports.deleteContact = async (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM contacts WHERE id = ?';
    try {
        await db.query(sql, [id]);
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting contact:', err);
        return res.status(500).json({ error: 'Database error while deleting contact' });
    }
};

// Import contacts from CSV
exports.importContacts = (req, res) => {
    const filePath = req.file.path; // Assumes you're using a file upload middleware like multer

    const contacts = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => contacts.push(data))
        .on('end', async () => {
            const sql = 'INSERT INTO contacts (user_id, name, phone_number, email, address) VALUES ?';
            const values = contacts.map(contact => [
                contact.user_id, contact.name, contact.phone_number, contact.email, contact.address
            ]);

            try {
                const [result] = await db.query(sql, [values]);
                res.status(201).json({ message: `${result.affectedRows} contacts imported successfully` });
            } catch (err) {
                console.error('Error importing contacts:', err);
                return res.status(500).json({ error: 'Database error while importing contacts' });
            }
        });
};

// Export contacts to CSV
exports.exportContacts = async (req, res) => {
    const sql = 'SELECT * FROM contacts';
    try {
        const [results] = await db.query(sql);
        const json2csvParser = new Parser({ fields: ['id', 'user_id', 'name', 'phone_number', 'email', 'address'] });
        const csvData = json2csvParser.parse(results);

        res.header('Content-Type', 'text/csv');
        res.attachment('contacts.csv');
        res.send(csvData);
    } catch (err) {
        console.error('Error exporting contacts:', err);
        return res.status(500).json({ error: 'Database error while exporting contacts' });
    }
};
