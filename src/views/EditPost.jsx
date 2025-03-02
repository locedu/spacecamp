import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPostByIdQuery, useUpdatePostMutation } from '../features/posts/postsAPI';
import '../styles/editPost.css';

function EditPost() {
  const { id } = useParams(); // Get post ID from URL
  const navigate = useNavigate();
  const { data: post, error, isLoading } = useGetPostByIdQuery(id); // Fetch post data
  const [updatePost] = useUpdatePostMutation(); // Mutation for updating post

  // Local state for form fields
  const [formData, setFormData] = useState({ title: '', content: '' });

  // Populate form once post data is available
  useEffect(() => {
    if (post) {
      setFormData({ title: post.title, content: post.content });
    }
  }, [post]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePost({ id, ...formData });
    navigate(`/dashboard/posts/${id}`); // Redirect to view post
  };

  if (isLoading) return <div className="loading-state">Loading post...</div>;
  if (error || !post) return <div className="error-message">Error loading post.</div>;

  return (
    <div className="edit-post-container">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        ></textarea>

        <div className="edit-post-actions">
          <button type="submit" className="save-btn">Save</button>
          <button type="button" className="cancel-btn" onClick={() => navigate(`/dashboard/posts/${id}`)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
