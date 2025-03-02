import React from 'react';
import { useGetPostsQuery } from '../features/posts/postsAPI';
import { useLocation, Link } from 'react-router-dom';
import Post from '../components/Post';
import '../styles/feed.css';

function Feed() {
  const { data: posts, error, isLoading } = useGetPostsQuery();
  const location = useLocation();

  if (isLoading) {
    return <div className="loading-state"><p>Loading posts...</p></div>;
  }

  if (error) {
    return <div className="error-message"><p>Error loading posts</p></div>;
  }

  if (!posts || posts.length === 0) {
    return <div className="loading-state"><p>No posts available</p></div>;
  }

  // Sort posts by updatedAt (newest first)
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  // Show only first 2 posts if on /dashboard, otherwise show all
  const isDashboard = location.pathname === "/dashboard";
  const visiblePosts = isDashboard ? sortedPosts.slice(0, 2) : sortedPosts;

  return (
    <div className="feed-container">
      {/* ✅ Small discreet label instead of large header */}
      <div className="feed-label">Recent Posts</div>

      {visiblePosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}

      {/* Buttons Container */}
      <div className="feed-buttons">
        {isDashboard && (
          <Link to="/dashboard/posts" className="feed-btn">View More</Link>
        )}
        <Link to="/dashboard/posts/new" className="feed-btn">New</Link>
      </div>
    </div>
  );
}

export default Feed;
