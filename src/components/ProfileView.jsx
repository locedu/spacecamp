import React from "react";
import { useSelector } from "react-redux";
import { useGetFriendsQuery, useAddFriendMutation, useRemoveFriendMutation } from "../features/friends/friendsAPI";
import { isTokenExpired } from "../utils/tokenExpiration";
import styles from "../styles/ProfileView.module.css";

function ProfileView({ user, onEdit }) {
  const authUserId = useSelector((state) => state.auth.user?.id);
  const selectedUserId = useSelector((state) => state.profile.selectedUserId);
  const token = useSelector((state) => state.auth.token);

  const { data: friends } = useGetFriendsQuery(undefined, {
    skip: isTokenExpired(token),
  });
  const [addFriend] = useAddFriendMutation();
  const [removeFriend] = useRemoveFriendMutation();

  const isFriend = friends?.some((friend) => friend.id === selectedUserId);

  const handleAddFriend = async () => {
    if (isTokenExpired(token)) return;
    try {
      await addFriend(selectedUserId).unwrap();
    } catch (err) {
      console.error("Error adding friend:", err);
    }
  };

  const handleRemoveFriend = async () => {
    if (isTokenExpired(token)) return;
    try {
      await removeFriend(selectedUserId).unwrap();
    } catch (err) {
      console.error("Error removing friend:", err);
    }
  };

  const formattedUpdatedAt = user?.updatedAt
    ? new Date(user.updatedAt).toLocaleDateString()
    : "Unknown";

  return (
    <div className={styles.profileContent}>
      <div className={styles.profileInfo}>
        <div className={styles.profileTitle}>
          <h2>Profile</h2>
        </div>
        <div><strong>Name:</strong> {user?.name || "N/A"}</div>
        <div><strong>Email:</strong> {user?.email || "N/A"}</div>
        <div><strong>Username:</strong> {user?.username || "N/A"}</div>
        <div><strong>Status:</strong> {user?.status || "N/A"}</div>
        <div><strong>Status Message:</strong> {user?.statusMessage || "No status"}</div>
        <div><strong>Bio:</strong> {user?.bio || "No bio available"}</div>
        <div><strong>Last Login:</strong> {user?.lastLogin || "Unknown"}</div>
        <div><strong>Last Updated:</strong> {formattedUpdatedAt}</div>
      </div>

      {selectedUserId === authUserId && (
        <div className={styles.profileFooter}>
          <button className={styles.editLink} onClick={onEdit}>Edit Profile</button>
        </div>
      )}

      {selectedUserId !== authUserId && (
        <div className={styles.profileFooter}>
          {isFriend ? (
            <button className={styles.removeFriend} onClick={handleRemoveFriend}>Remove Friend</button>
          ) : (
            <button className={styles.addFriend} onClick={handleAddFriend}>Add Friend</button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileView;
