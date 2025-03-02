import React from 'react';
import { useGetPostsQuery } from '../features/posts/postsAPI';  // Import the RTK Query hook
import '../styles/feed.css'; // Styling for Feed component

function Feed() {
  const { data: posts, error, isLoading } = useGetPostsQuery(); // Fetch posts from the backend

  // Loading state
  if (isLoading) {
    return (
      <div className="loading-state">
        <p>Loading posts...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="error-message">
        <p>Error loading posts</p>
      </div>
    );
  }

  // No posts available
  if (!posts || posts.length === 0) {
    return (
      <div className="loading-state">
        <p>No posts available</p>
      </div>
    );
  }

  // Format the updatedAt date
  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString(); // Convert to a readable date string
  };

  // Display posts
  return (
    <div className="feed-container">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">
            <h2>{post.title}</h2>
            <p className="author">by {post.user.name}</p>
          </div>
          <div className="post-content">
            <p>{post.content}</p>
          </div>
          <div className="post-footer">
            <span className="timestamp">Updated at: {formatDate(post.updatedAt)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;
