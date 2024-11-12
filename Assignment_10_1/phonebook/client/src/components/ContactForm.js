// src/components/ContactForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
    const [contact, setContact] = useState({
        name: '',
        phone_number: '',
        email: '',
        address: '',
        user_id: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/contacts', contact);
            console.log(response.data);
        } catch (error) {
            console.error('Error adding contact:', error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={contact.name} onChange={handleChange} placeholder="Name" required />
            <input name="phone_number" value={contact.phone_number} onChange={handleChange} placeholder="Phone Number" required />
            <input name="email" value={contact.email} onChange={handleChange} placeholder="Email" required />
            <input name="address" value={contact.address} onChange={handleChange} placeholder="Address" required />
            <input name="user_id" value={contact.user_id} onChange={handleChange} placeholder="User ID" required />
            <button type="submit">Add Contact</button>
        </form>
    );
};

export default ContactForm;
