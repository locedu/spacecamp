import { useEffect } from 'react';
import { useFetchUserProfileQuery } from '../features/auth/authAPI';  // Use RTK Query hook
import { Box, CircularProgress, Typography } from '@mui/material';  // MUI components
import '../styles/profile.css'; // Profile styles

function Profile() {
  const { data: response, error, isLoading } = useFetchUserProfileQuery();  // Fetch user profile

  // Log the response data for debugging
  useEffect(() => {
    if (response) {
      console.log("Response data:", response);  // Check the data structure in console
    }
  }, [response]);

  // Loading state
  if (isLoading) {
    return (
      <Box sx={{ textAlign: 'center', padding: '20px' }}>
        <CircularProgress />
        <Typography>Loading profile...</Typography>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ textAlign: 'center', padding: '20px' }}>
        <Typography color="error">Error loading profile</Typography>
      </Box>
    );
  }

  // Handle case where user data is not available
  if (!response?.user) {
    return (
      <Box sx={{ textAlign: 'center', padding: '20px' }}>
        <Typography>No profile data available</Typography>
      </Box>
    );
  }

  const user = response.user;  // Extract user object

  // User data display with fallbacks
  return (
    <Box className="profile-container">
      <Typography variant="h4" align="center">{user?.name || 'Unknown User'}'s Profile</Typography>
      
      {/* Profile Image */}
      <Box className="profile-image-container" sx={{ textAlign: 'center' }}>
        <img
          src={user?.profileImage || 'default-avatar.png'}  // Fallback image if no profile image is available
          alt={`${user?.name}'s profile`}
          className="profile-image"
          style={{ borderRadius: '50%', width: '150px', height: '150px', objectFit: 'cover' }}
        />
      </Box>
      
      {/* User Information */}
      <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
        <Typography><strong>Email:</strong> {user?.email || 'N/A'}</Typography>
        <Typography><strong>Username:</strong> {user?.username || 'N/A'}</Typography>
        <Typography><strong>Status:</strong> {user?.status || 'N/A'}</Typography>
        <Typography><strong>Status Message:</strong> {user?.statusMessage || 'No status'}</Typography>
        <Typography><strong>Bio:</strong> {user?.bio || 'No bio available'}</Typography>
      </Box>
    </Box>
  );
}

export default Profile;
