import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetPostByIdQuery } from '../features/posts/postsAPI';
import '../styles/viewPost.css';

function ViewPost() {
  const { id } = useParams();
  const { data: post, error, isLoading } = useGetPostByIdQuery(id);

  if (isLoading) return <div className="loading-state">Loading post...</div>;
  if (error || !post) return <div className="error-message">Error loading post or post not found.</div>;

  // Format date and time
  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString() + " " + newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="view-post-container">
      <div className="post">
        <div className="post-header">
          <h2>{post.title}</h2>
        </div>
        <div className="post-content">
          {post.content}
        </div>
        <div className="post-footer">
          <span className="timestamp">Updated: {formatDate(post.updatedAt)}</span>
          <p className="post-author">by {post.user?.name || "Unknown Author"}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="view-post-actions">
        <Link to={`/dashboard/posts/${post.id}/edit`} className="edit-btn">Edit</Link>
        <Link to="/dashboard/posts" className="view-post-back-btn">Back</Link>
      </div>
    </div>
  );
}

export default ViewPost;
