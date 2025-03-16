import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../styles/Post.module.css'; // Import the CSS module

function Post({ post }) {
  const { id } = useParams(); // Get post ID from the route

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString() + " " + newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        <h2>Post: {post.title}</h2>
      </div>
      <div className={styles.postContent}>
        {post.content}
      </div>

      {/* Footer */}
      <div className={styles.postFooter}>
        <div className={styles.postDetails}>
          <p className={styles.postAuthor}>
            {post.user?.name || "Unknown User"} (@{post.user?.username || "unknown"})
          </p>
          <p className={styles.timestamp}>{formatDate(post.updatedAt)}</p>
          <p>Comments ({post.comments?.length || 0})</p>
          <p>Likes ({post.likes?.length || 0})</p>
        </div>
      </div>

      {/* ✅ Moved View Post button below the footer */}
      {id !== String(post.id) && (
        <div className={styles.viewPostContainer}>
          <Link to={`/dashboard/posts/${post.id}`} className={styles.viewPostButton}>
            View Post
          </Link>
        </div>
      )}
    </div>
  );
}

export default Post;
