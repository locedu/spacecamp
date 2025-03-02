import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/post.css'; // Separate styles for posts

function Post({ post }) {
  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString() + " " + newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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
