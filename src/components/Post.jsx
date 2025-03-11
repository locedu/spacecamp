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
        <h2>{post.title}</h2>
      </div>
      <div className={styles.postContent}>
        {post.content}
      </div>

      {/* Footer */}
      <div className={styles.postFooter}>
        <div className={styles.postDetails}>
          <p className={styles.postAuthor}>{post.user?.name || "Unknown User"}</p>
          <p className={styles.timestamp}>{formatDate(post.updatedAt)}</p>
          <p>Comments ({post.comments?.length || 0})</p>
          <p>Likes ({post.likes?.length || 0})</p>
        </div>
        <div className={styles.postActions}>
          {id !== String(post.id) && (
            <Link to={`/dashboard/posts/${post.id}`} className={styles.viewPostLink}>
              View Post
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
