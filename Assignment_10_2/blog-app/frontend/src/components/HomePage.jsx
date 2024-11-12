import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreatePost from './CreatePost';

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login'); // Redirect to login if no token
                return;
            }
            const response = await axios.get('http://localhost:5000/posts', {
                params: {
                    user_id: localStorage.getItem('userId'),
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error.response?.data?.message || error.message);
            if (error.response?.status === 401) {
                navigate('/login'); // Redirect to login on token failure
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');  // Remove the token
        localStorage.removeItem('userId'); // Remove the user ID
        navigate('/login');                // Redirect to login page
    };


    return (
        <div className="container mx-auto p-4 font-figtree">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">All Posts</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post.id} className="bg-white p-4 rounded shadow mb-4">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p>{post.content}</p>
                    </div>
                ))
            ) : (
                <p>No posts available.</p>
            )}
            <CreatePost onPostCreated={fetchPosts} />
        </div>
    );
};

export default HomePage;
