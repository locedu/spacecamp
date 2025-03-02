import { useEffect } from 'react';
import { useFetchUserProfileQuery } from '../features/auth/authAPI';
import '../styles/profile.css';

function Profile() {
  const { data: response, error, isLoading } = useFetchUserProfileQuery();

  useEffect(() => {
    if (response) {
      console.log("Response data:", response);
    }
  }, [response]);

  if (isLoading) {
    return <div className="profile-container"><div className="profile-content">Loading profile...</div></div>;
  }

  if (error) {
    return <div className="profile-container"><div className="profile-content error">Error loading profile</div></div>;
  }

  if (!response?.user) {
    return <div className="profile-container"><div className="profile-content no-data">No profile data available</div></div>;
  }

  const user = response.user;

  // Format updatedAt to show only the date
  const formattedUpdatedAt = user?.updatedAt
    ? new Date(user.updatedAt).toLocaleDateString()
    : 'Unknown';

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h2>Profile</h2>
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
