import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 10;

    const fetchContacts = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/contacts?page=${page}&limit=${limit}`, {
            headers: { 'x-access-token': token }
        });
        setContacts(response.data);
    };

    useEffect(() => {
        fetchContacts();
    }, [page]);

    return (
        <div>
            <h2>Contact List</h2>
            <ul>
                {contacts.map(contact => (
                    <li key={contact.id}>{contact.name} - {contact.email}</li>
                ))}
            </ul>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    );
};

export default ContactList;
