import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/comment.css';

function Comment({ comment }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <li className="comment-item">
      <p className="comment-content">"{comment.content}"</p>
      <p className="comment-author">
        <strong>{comment.user?.name || "Unknown User"}</strong>
      </p>
      <p className="comment-time">
        Last updated on {new Date(comment.updatedAt).toLocaleString()}
      </p>

      {/* ✅ Show Edit button only if the logged-in user owns the comment */}
      {user?.id === comment.userId && (
        <Link to={`/dashboard/comments/${comment.id}/edit`} className="edit-comment-link">
          Edit
        </Link>
      )}
    </li>
  );
}

export default Comment;
