const express = require('express');
const Contact = require('../models/contact');
const auth = require('../middleware/auth');
const router = express.Router();

router.use(auth);

router.post('/', (req, res) => {
    const contact = { ...req.body, user_id: req.userId };
    Contact.create(contact, (err, result) => {
        if (err) return res.status(500).send("Error creating contact.");
        res.status(201).send({ id: result.insertId, ...contact });
    });
});

router.get('/', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    Contact.findAll(req.userId, page, limit, (err, contacts) => {
        if (err) return res.status(500).send("Error retrieving contacts.");
        res.status(200).send(contacts);
    });
});

router.get('/:id', (req, res) => {
    Contact.findById(req.params.id, req.userId, (err, contact) => {
        if (err || !contact.length) return res.status(404).send("Contact not found.");
        res.status(200).send(contact[0]);
    });
});

router.put('/:id', (req, res) => {
    Contact.update(req.params.id, req.userId, req.body, (err) => {
        if (err) return res.status(500).send("Error updating contact.");
        res.status(200).send("Contact updated.");
    });
});

router.delete('/:id', (req, res) => {
    Contact.delete(req.params.id, req.userId, (err) => {
        if (err) return res.status(500).send("Error deleting contact.");
        res.status(204).send();
    });
});

router.get('/search', (req, res) => {
    const { query } = req.query;
    Contact.search(req.userId, query, (err, contacts) => {
        if (err) return res.status(500).send("Error searching contacts.");
        res.status(200).send(contacts);
    });
});

module.exports = router;
