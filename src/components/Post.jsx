import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/post.css'; // Separate styles for posts

function Post({ post }) {
  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div className="post">
      <div className="post-header">
        <h2>{post.title}</h2>
      </div>
      <div className="post-content">
        {post.content}
      </div>
      <div className="post-footer">
        <span className="timestamp">{formatDate(post.updatedAt)}</span>
        <p className="author post-author">{post.user.name}</p>
        {/* Link to View Post */}
        <Link to={`/dashboard/posts/${post.id}`} className="view-post-link">
          View Post
        </Link>
      </div>
    </div>
  );
}

export default Post;
