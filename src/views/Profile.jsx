import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useGetUserByIdQuery } from '../features/user/userAPI'; // Import the correct hook
import { setSelectedUserId } from '../features/profile/profileSlice'; // Action to set selectedUserId
import '../styles/profile.css';

function Profile() {
  const dispatch = useDispatch();
  
  const selectedUserId = useSelector((state) => state.profile.selectedUserId);
  const authUserId = useSelector((state) => state.auth.user?.id);  // Get the authenticated user's ID from auth slice

  // If selectedUserId is null, set it to the authenticated user's ID
  useEffect(() => {
    if (selectedUserId === null && authUserId) {
      dispatch(setSelectedUserId(authUserId));
    }
  }, [selectedUserId, authUserId, dispatch]);

  // Use selectedUserId to fetch the profile
  const { data: userResponse, isLoading, error } = useGetUserByIdQuery(selectedUserId);

  if (isLoading) {
    return (
      <div className="profile-container">
        <div className="profile-content">Loading profile...</div>
        {/* Display selectedUserId for debugging */}
        <div><strong>selectedUserId:</strong> [{selectedUserId ?? 'null'}]</div>
        {/* Display authUserId for debugging */}
        <div><strong>authUserId:</strong> [{authUserId ?? 'null'}]</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="profile-content error">
          Error loading profile
          {/* Display the error details for debugging */}
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
        {/* Display selectedUserId for debugging */}
        <div><strong>selectedUserId:</strong> [{selectedUserId ?? 'null'}]</div>
        {/* Display authUserId for debugging */}
        <div><strong>authUserId:</strong> [{authUserId ?? 'null'}]</div>
      </div>
    );
  }

  if (!userResponse) {
    return (
      <div className="profile-container">
        <div className="profile-content no-data">
          No profile data available
          {/* Display the raw response for debugging */}
          <pre>{JSON.stringify(userResponse, null, 2)}</pre>
        </div>
        {/* Display selectedUserId for debugging */}
        <div><strong>selectedUserId:</strong> [{selectedUserId ?? 'null'}]</div>
        {/* Display authUserId for debugging */}
        <div><strong>authUserId:</strong> [{authUserId ?? 'null'}]</div>
      </div>
    );
  }

  const user = userResponse;  // Accessing the user data directly from the response

  // Format updatedAt to show only the date
  const formattedUpdatedAt = user?.updatedAt
    ? new Date(user.updatedAt).toLocaleDateString()
    : 'Unknown';

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h2>Profile</h2>

        {/* Debug: Display selectedUserId with label */}
        <div><strong>selectedUserId:</strong> [{selectedUserId ?? 'null'}]</div>
        {/* Debug: Display authUserId with label */}
        <div><strong>authUserId:</strong> [{authUserId ?? 'null'}]</div>

        <div className="profile-info">
          <div><strong>Name:</strong> {user?.name || 'N/A'}</div>
          <div><strong>Email:</strong> {user?.email || 'N/A'}</div>
          <div><strong>Username:</strong> {user?.username || 'N/A'}</div>
          <div><strong>Status:</strong> {user?.status || 'N/A'}</div>
          <div><strong>Status Message:</strong> {user?.statusMessage || 'No status'}</div>
          <div><strong>Bio:</strong> {user?.bio || 'No bio available'}</div>
          <div><strong>Last Login:</strong> {user?.lastLogin || 'Unknown'}</div>
        </div>

        {/* Footer with formatted Updated Date and Edit Profile */}
        <div className="profile-footer">
          <div className="last-updated">Updated: {formattedUpdatedAt}</div>
          <a href="#" className="edit-link">Edit</a>
        </div>
      </div>
    </div>
  );
}

export default Profile;
