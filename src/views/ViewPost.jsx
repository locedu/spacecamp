import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetPostByIdQuery } from '../features/posts/postsAPI';
import '../styles/viewPost.css';

function ViewPost() {
  const { id } = useParams(); // Get post ID from URL
  const { data: post, error, isLoading } = useGetPostByIdQuery(id); // Fetch post by ID

  if (isLoading) {
    return <div className="loading-state">Loading post...</div>;
  }

  if (error || !post) {
    return <div className="error-message">Error loading post or post not found.</div>;
  }

  // Ensure post.user exists to prevent runtime errors
  const authorName = post?.user?.name || "Unknown Author";

  // Format date
  const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : "Unknown Date");

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
          <p className="post-author">by {authorName}</p>
        </div>
      </div>

      {/* Back Button */}
      <div className="view-post-actions">
        <Link to="/dashboard/posts" className="view-post-back-btn">Back</Link>
      </div>
    </div>
  );
}

export default ViewPost;
