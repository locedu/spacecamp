import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useGetUserByIdQuery } from "../features/user/userAPI";
import { setSelectedUserId } from "../features/profile/profileSlice";
import { useGetFriendsQuery } from "../features/friends/friendsAPI";
import ProfileView from "../components/ProfileView";
import ProfileEdit from "../components/ProfileEdit";
import styles from "../styles/Profile.module.css"; // Import the CSS module

function Profile() {
  const dispatch = useDispatch();

  const selectedUserId = useSelector((state) => state.profile.selectedUserId);
  const authUserId = useSelector((state) => state.auth.user?.id); // Get the authenticated user's ID from auth slice
  const [isEditMode, setIsEditMode] = useState(false); // Track edit mode state

  useEffect(() => {
    if (selectedUserId === null && authUserId) {
      dispatch(setSelectedUserId(authUserId));
    }
  }, [selectedUserId, authUserId, dispatch]);

  const { data: userResponse, isLoading, error } = useGetUserByIdQuery(selectedUserId);
  const { data: friends, isLoading: friendsLoading, error: friendsError } = useGetFriendsQuery();

  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    if (friends && userResponse) {
      setIsFriend(friends.some((friend) => friend.id === userResponse.id));
    }
  }, [friends, userResponse]);

  const handleEditClick = () => {
    setIsEditMode(true); // Switch to edit mode
  };

  const handleSave = async (updatedUser) => {
    try {
      // Send the updated data to the backend to save
      setIsEditMode(false); // Switch back to view mode after saving
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false); // Switch back to view mode without saving
  };

  if (isLoading || friendsLoading) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.profileContent}>Loading profile...</div>
      </div>
    );
  }

  if (error || friendsError) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.profileContentError}>
          Error loading profile
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      </div>
    );
  }

  if (!userResponse) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.profileContentNoData}>
          No profile data available
        </div>
      </div>
    );
  }

  const user = userResponse;

  return (
    <div className={styles.profileContainer}>
      {isEditMode ? (
        <ProfileEdit user={user} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <ProfileView user={user} onEdit={handleEditClick} />
      )}
    </div>
  );
}

export default Profile;
