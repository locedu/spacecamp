import React from 'react';
import '../styles/comment.css';

function Comment({ comment }) {
  return (
    <li className="comment-item">
      <p className="comment-content">"{comment.content}"</p>
      <p className="comment-author">
        <strong>{comment.user?.name || "Unknown User"}</strong>
      </p>
      <p className="comment-time">
        Posted on {new Date(comment.createdAt).toLocaleString()}
      </p>
    </li>
  );
}

export default Comment;
