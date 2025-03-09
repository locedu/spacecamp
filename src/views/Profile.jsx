import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useGetUserByIdQuery } from "../features/user/userAPI";
import { setSelectedUserId } from "../features/profile/profileSlice";
import {
  useGetFriendsQuery,
  useAddFriendMutation,
  useRemoveFriendMutation,
} from "../features/friends/friendsAPI";
import styles from "../styles/Profile.module.css"; // Import the CSS module

function Profile() {
  const dispatch = useDispatch();

  const selectedUserId = useSelector((state) => state.profile.selectedUserId);
  const authUserId = useSelector((state) => state.auth.user?.id); // Get the authenticated user's ID from auth slice

  useEffect(() => {
    if (selectedUserId === null && authUserId) {
      dispatch(setSelectedUserId(authUserId));
    }
  }, [selectedUserId, authUserId, dispatch]);

  const {
    data: userResponse,
    isLoading,
    error,
  } = useGetUserByIdQuery(selectedUserId);
  const {
    data: friends,
    isLoading: friendsLoading,
    error: friendsError,
  } = useGetFriendsQuery();
  const [addFriend] = useAddFriendMutation();
  const [removeFriend] = useRemoveFriendMutation();

  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    if (friends && userResponse) {
      setIsFriend(friends.some((friend) => friend.id === userResponse.id));
    }
  }, [friends, userResponse]);

  const handleAddFriend = async () => {
    try {
      await addFriend(userResponse.id);
      setIsFriend(true);
    } catch (err) {
      console.error("Error adding friend:", err);
    }
  };

  const handleRemoveFriend = async () => {
    try {
      await removeFriend(userResponse.id);
      setIsFriend(false);
    } catch (err) {
      console.error("Error removing friend:", err);
    }
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

  const formattedUpdatedAt = user?.updatedAt
    ? new Date(user.updatedAt).toLocaleDateString()
    : "Unknown";

  return (
    <div className={styles.profileContainer}>
      {/* Header section */}
      {/* <div className={styles.profileHeader}>
        <h2>Profile</h2>
      </div> */}

      <div className={styles.profileContent}>
        <div className={styles.profileInfo}>
          <div className={styles.profileTitle}>
            <h2>Profile</h2>
          </div>
          <div>
            <strong>Name:</strong> {user?.name || "N/A"}
          </div>
          <div>
            <strong>Email:</strong> {user?.email || "N/A"}
          </div>
          <div>
            <strong>Username:</strong> {user?.username || "N/A"}
          </div>
          <div>
            <strong>Status:</strong> {user?.status || "N/A"}
          </div>
          <div>
            <strong>Status Message:</strong>{" "}
            {user?.statusMessage || "No status"}
          </div>
          <div>
            <strong>Bio:</strong> {user?.bio || "No bio available"}
          </div>
          <div>
            <strong>Last Login:</strong> {user?.lastLogin || "Unknown"}
          </div>
          <div>
            <strong>Last updated:</strong> {formattedUpdatedAt || "Unknown"}
          </div>
        </div>

        {authUserId !== user.id &&
          (!isFriend ? (
            <button onClick={handleAddFriend} className={styles.friendButton}>
              Add Friend
            </button>
          ) : (
            <button
              onClick={handleRemoveFriend}
              className={styles.friendButton}
            >
              Remove Friend
            </button>
          ))}

        <div className={styles.profileFooter}>
          <a href="#" className={styles.editLink}>
            Edit
          </a>
        </div>
      </div>
    </div>
  );
}

export default Profile;
