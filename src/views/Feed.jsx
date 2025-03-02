import React from 'react';
import { useGetPostsQuery } from '../features/posts/postsAPI';
import { useLocation, Link } from 'react-router-dom';
import Post from '../components/Post';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
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
  const isPostsPage = location.pathname === "/dashboard/posts";
  const visiblePosts = isDashboard ? sortedPosts.slice(0, 2) : sortedPosts;

  // ✅ Set dynamic title
  const pageTitle = isDashboard ? "Recent Posts" : isPostsPage ? "Posts" : "Feed";

  return (
    <div className="feed-container">
      <AppBar position="static" color="primary" className="feed-appbar">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {pageTitle}
          </Typography>
          <IconButton color="inherit" component={Link} to="/dashboard/posts/new">
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {visiblePosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}

      {/* ✅ Plain text link for "View All (Total Count)" */}
      {isDashboard && (
        <div className="feed-view-all">
          <Link to="/dashboard/posts" className="view-all-link">
            View All ({posts.length})
          </Link>
        </div>
      )}
    </div>
  );
}

export default Feed;
