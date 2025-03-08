import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useGetUserByIdQuery } from '../features/user/userAPI'; // Import the correct hook
import { setSelectedUserId } from '../features/profile/profileSlice'; // Action to set selectedUserId
import { useGetFriendsQuery, useAddFriendMutation, useRemoveFriendMutation } from '../features/friends/friendsAPI'; // Import the hooks for friends
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

  // Fetch the friends list to check if the user is already a friend
  const { data: friends, isLoading: friendsLoading, error: friendsError } = useGetFriendsQuery();
  const [addFriend] = useAddFriendMutation();
  const [removeFriend] = useRemoveFriendMutation();
  
  const [isFriend, setIsFriend] = useState(false);

  // Check if the selected user is already a friend
  useEffect(() => {
    if (friends && userResponse) {
      setIsFriend(friends.some((friend) => friend.id === userResponse.id));
    }
  }, [friends, userResponse]);

  const handleAddFriend = async () => {
    try {
      await addFriend(userResponse.id); // Add user as a friend
      setIsFriend(true); // Update the state to show that the user is now a friend
    } catch (err) {
      console.error("Error adding friend:", err);
    }
  };

  const handleRemoveFriend = async () => {
    try {
      await removeFriend(userResponse.id); // Remove user as a friend
      setIsFriend(false); // Update the state to show that the user is no longer a friend
    } catch (err) {
      console.error("Error removing friend:", err);
    }
  };

  if (isLoading || friendsLoading) {
    return (
      <div className="profile-container">
        <div className="profile-content">Loading profile...</div>
      </div>
    );
  }

  if (error || friendsError) {
    return (
      <div className="profile-container">
        <div className="profile-content error">
          Error loading profile
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      </div>
    );
  }

  if (!userResponse) {
    return (
      <div className="profile-container">
        <div className="profile-content no-data">No profile data available</div>
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
        <div className="profile-info">
          <div><strong>Name:</strong> {user?.name || 'N/A'}</div>
          <div><strong>Email:</strong> {user?.email || 'N/A'}</div>
          <div><strong>Username:</strong> {user?.username || 'N/A'}</div>
          <div><strong>Status:</strong> {user?.status || 'N/A'}</div>
          <div><strong>Status Message:</strong> {user?.statusMessage || 'No status'}</div>
          <div><strong>Bio:</strong> {user?.bio || 'No bio available'}</div>
          <div><strong>Last Login:</strong> {user?.lastLogin || 'Unknown'}</div>
        </div>

        {/* Conditionally render Add or Remove Friend button */}
        {authUserId !== user.id && (
          !isFriend ? (
            <button onClick={handleAddFriend} className="friend-button">
              Add Friend
            </button>
          ) : (
            <button onClick={handleRemoveFriend} className="friend-button">
              Remove Friend
            </button>
          )
        )}

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
