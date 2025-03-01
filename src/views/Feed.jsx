import React from 'react';
import { useGetPostsQuery } from '../features/posts/postsAPI';  // Import the RTK Query hook
import { Box, CircularProgress, Typography, Card, CardContent, CardHeader } from '@mui/material';  // MUI components
import '../styles/feed.css'; // Styling for Feed component

function Feed() {
  const { data: posts, error, isLoading } = useGetPostsQuery(); // Fetch posts from the backend

  // Loading state
  if (isLoading) {
    return (
      <Box sx={{ textAlign: 'center', padding: '20px' }}>
        <CircularProgress />
        <Typography>Loading posts...</Typography>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ textAlign: 'center', padding: '20px' }}>
        <Typography color="error">Error loading posts</Typography>
      </Box>
    );
  }

  // No posts available
  if (!posts || posts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', padding: '20px' }}>
        <Typography>No posts available</Typography>
      </Box>
    );
  }

  // Format the updatedAt date
  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString(); // Convert to a readable date string
  };

  // Display posts using Material-UI Card
  return (
    <Box className="feed-container">
      {posts.map((post) => (
        <Card key={post.id} sx={{ marginBottom: '20px', borderRadius: '8px', boxShadow: 2 }}>
          <CardHeader
            title={post.title}  // Post title
            subheader={`by ${post.user.name}`}  // Author's username (post.user.name)
            sx={{ backgroundColor: '#f5f5f5' }} // Header background color
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.content}  {/* Post content */}
            </Typography>
            <Typography variant="caption" color="textSecondary" sx={{ marginTop: '10px' }}>
              Updated at: {formatDate(post.updatedAt)} {/* Post update timestamp */}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default Feed;
