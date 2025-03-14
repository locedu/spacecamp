import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useGetUserByIdQuery } from "../features/user/userAPI";
import { setSelectedUserId } from "../features/profile/profileSlice";
import { useGetFriendsQuery } from "../features/friends/friendsAPI";
import ProfileView from "../components/ProfileView";
import ProfileEdit from "../components/ProfileEdit";
import styles from "../styles/Profile.module.css";

function Profile() {
  const dispatch = useDispatch();
  const selectedUserId = useSelector((state) => state.profile.selectedUserId);
  const authUserId = useSelector((state) => state.auth.user?.id);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (!selectedUserId && authUserId) {
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
    setIsEditMode(true);
  };

  const handleSave = async (updatedUser) => {
    try {
      setIsEditMode(false);
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  if (isLoading || friendsLoading) {
    return <div className={styles.profileContainer}><div className={styles.profileContent}>Loading profile...</div></div>;
  }

  if (error || friendsError) {
    return <div className={styles.profileContainer}><div className={styles.profileContentError}>Error loading profile</div></div>;
  }

  if (!userResponse) {
    return <div className={styles.profileContainer}><div className={styles.profileContentNoData}>No profile data available</div></div>;
  }

  return (
    <div className={styles.profileContainer}>
      {isEditMode ? (
        <ProfileEdit user={userResponse} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <ProfileView user={userResponse} onEdit={selectedUserId === authUserId ? handleEditClick : null} />
      )}
    </div>
  );
}

export default Profile;
