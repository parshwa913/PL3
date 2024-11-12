import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CreatePost.css'; // Importing the CSS file

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Ensure the token is retrieved

    // Create a FormData object
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in header
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/"); // Redirect to homepage after creating the post
    } catch (err) {
      setError("Error creating post: " + (err.response?.data.message || err.message));
    }
  };

  return (
    <div className="create-post-container">
      <h1>Create Post</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleCreatePost} className="post-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            placeholder="Write your post here"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="button-container">
          <button type="submit">Create Post</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
