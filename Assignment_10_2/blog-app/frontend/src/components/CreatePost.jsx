import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ onPostCreated }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input
        if (!title || !content) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You must be logged in to create a post.');
                navigate('/login');
                return;
            }

            // Send POST request to backend to create a new post
            const response = await axios.post(
                'http://localhost:5000/posts',
                {
                    title,
                    content,
                    user_id: localStorage.getItem('userId'),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Reset form and redirect
            setTitle('');
            setContent('');

            if (onPostCreated) {
                onPostCreated(response.data);  // You can pass the newly created post if needed
            }
        } catch (err) {
            console.error('Error creating post:', err.response?.data?.message || err.message);
            setError('Failed to create the post.');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
                        Content
                    </label>
                    <textarea
                        id="content"
                        rows="6"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
