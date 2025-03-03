import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/comment.css';

function Comment({ comment }) {
  // ✅ Correctly get the user from `authAPI`
  const user = useSelector((state) => state.authAPI.queries["fetchUserProfile(undefined)"]?.data?.user);

  return (
    <li className="comment-item">
      <p className="comment-content">"{comment.content}"</p>
      <p className="comment-author">
        <strong>{comment.user?.name || "Unknown User"}</strong>
      </p>
      <p className="comment-time">
        Posted on {new Date(comment.createdAt).toLocaleString()}
      </p>

      {/* ✅ Debugging: Show logged-in user ID and comment owner ID */}
      <p className="debug-info">
        <strong>Redux User ID:</strong> {user?.id || "Not found"} <br />
        <strong>Comment Owner ID:</strong> {comment.userId}
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
