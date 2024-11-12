import React, { useState } from 'react';
import axios from 'axios';

const AddContact = () => {
    const [name, setName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const handleAddContact = async () => {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/contacts', { name, phone_number, email, address }, {
            headers: { 'x-access-token': token }
        });
        // Redirect to contact list
    };

    return (
        <div>
            <h2>Add Contact</h2>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)} />
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
            <button onClick={handleAddContact}>Add Contact</button>
        </div>
    );
};

export default AddContact;
