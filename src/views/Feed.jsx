import React, { useEffect } from 'react';
import { useGetPostsQuery } from '../features/posts/postsAPI';
import { useLocation, Link } from 'react-router-dom';
import Post from '../components/Post';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from '../styles/Feed.module.css'; // Import the CSS module

function Feed() {
  const { data: posts, error, isLoading, refetch } = useGetPostsQuery();
  const location = useLocation();

  // Force a fresh request when the component is mounted or navigated back to
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <div className={styles.loadingState}><p>Loading posts...</p></div>;
  }

  if (error) {
    return <div className={styles.errorMessage}><p>Error loading posts</p></div>;
  }

  // Sort posts by updatedAt (newest first)
  const sortedPosts = [...posts || []].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  // Show only first 2 posts if on /dashboard, otherwise show all
  const isDashboard = location.pathname === "/dashboard";
  const isPostsPage = location.pathname === "/dashboard/posts";
  const visiblePosts = isDashboard ? sortedPosts.slice(0, 2) : sortedPosts;

  // Set dynamic title
  const pageTitle = isDashboard ? "Recent Posts" : isPostsPage ? "Posts" : "Feed";

  return (
    <div className={styles.feedContainer}>
      <AppBar position="static" color="primary" className={styles.feedAppbar}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {pageTitle}
          </Typography>
          <IconButton color="inherit" component={Link} to="/dashboard/posts/new">
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className={styles.feedPosts}>
        {visiblePosts.length > 0 ? (
          visiblePosts.map((post) => (
            <Post key={post.id} post={post} />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>

      {isDashboard && (
        <div className={styles.feedViewAll}>
          <Link to="/dashboard/posts" className={styles.viewAllLink}>
            View All ({posts.length})
          </Link>
        </div>
      )}
    </div>
  );
}

export default Feed;
