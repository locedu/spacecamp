import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from '../styles/Comment.module.css'; // ✅ Import CSS Module

function Comment({ comment }) {
  const user = useSelector((state) => state.auth.user);

  // ✅ Determine the footer text dynamically
  const isOwnComment = user?.id === comment.userId;
  const commentText = isOwnComment
    ? `You commented on ${new Date(comment.updatedAt).toLocaleString()}`
    : `${comment.user?.name || "Unknown User"} (@${comment.user?.username || "unknown"}) commented on ${new Date(comment.updatedAt).toLocaleString()}`;

  return (
    <li className={styles.commentItem}>
      <p className={styles.commentContent}>{comment.content}</p>

      {/* ✅ Footer with dynamic author display */}
      <div className={styles.commentFooter}>
        <p className={styles.commentAuthor}>{commentText}</p>
      </div>

      {/* ✅ Show Edit button only if the logged-in user owns the comment */}
      {isOwnComment && (
        <Link to={`/dashboard/comments/${comment.id}/edit`} className={styles.editCommentLink}>
          Edit
        </Link>
      )}
    </li>
  );
}

export default Comment;
