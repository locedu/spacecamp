import React from 'react';
import { useGetPostsQuery } from '../features/posts/postsAPI';
import { useLocation, Link } from 'react-router-dom'; // Import useLocation and Link
import '../styles/feed.css';

function Feed() {
  const { data: posts, error, isLoading } = useGetPostsQuery();
  const location = useLocation(); // Get current route

  if (isLoading) {
    return (
      <div className="loading-state">
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>Error loading posts</p>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="loading-state">
        <p>No posts available</p>
      </div>
    );
  }

  // Sort posts by updatedAt (newest first)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  // Show only first 2 posts if on /dashboard, otherwise show all
  const isDashboard = location.pathname === "/dashboard";
  const visiblePosts = isDashboard ? sortedPosts.slice(0, 2) : sortedPosts;

  // Format date function
  const formatDate = (date) => new Date(date).toLocaleString();

  return (
    <div className="feed-container">
      {visiblePosts.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">
            <h2>{post.title}</h2>
            <p className="author">by {post.user.name}</p>
          </div>
          <div className="post-content">
            <p>{post.content}</p>
          </div>
          <div className="post-footer">
            <span className="timestamp">Updated: {formatDate(post.updatedAt)}</span>
          </div>
        </div>
      ))}

      {/* Show "View More" only on /dashboard */}
      {isDashboard && (
        <div className="view-more">
          <Link to="/dashboard/feed">View More</Link>
        </div>
      )}
    </div>
  );
}

export default Feed;
