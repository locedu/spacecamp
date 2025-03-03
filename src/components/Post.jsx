import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/post.css';

function Post({ post }) {
  const { id } = useParams(); // Get post ID from the route

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

      {/* Footer */}
      <div className="post-footer">
        <div className="post-details">
          <p className="post-author">{post.user?.name || "Unknown User"}</p>
          <p className="timestamp">{formatDate(post.updatedAt)}</p>
          <p>Comments ({post.comments?.length || 0})</p>
          <p>Likes ({post.likes?.length || 0})</p>
        </div>
        <div className="post-actions">
          {id !== String(post.id) && (
            <Link to={`/dashboard/posts/${post.id}`} className="view-post-link">
              View Post
            </Link>
          )}
        </div>
      </div>

      {/* REMOVE COMMENT RENDERING COMPLETELY */}
    </div>
  );
}

export default Post;
