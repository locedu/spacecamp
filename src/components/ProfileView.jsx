import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetFriendsQuery, useAddFriendMutation, useRemoveFriendMutation } from "../features/friends/friendsAPI";
import { logout } from "../features/auth/authSlice";
import { isTokenExpired } from "../utils/tokenExpiration";
import { postsAPI } from "../features/posts/postsAPI"; // ✅ Import postsAPI
import styles from "../styles/ProfileView.module.css";

function ProfileView({ user, onEdit }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUserId = useSelector((state) => state.auth.user?.id);
  const authUserRole = useSelector((state) => state.auth.user?.role);
  const selectedUserId = useSelector((state) => state.profile.selectedUserId);
  const token = useSelector((state) => state.auth.token);

  // ✅ Redirect to /login if token is expired
  useEffect(() => {
    if (isTokenExpired(token)) {
      dispatch(logout());
      navigate("/login");
    }
  }, [token, dispatch, navigate]);

  // ✅ Skip API calls if token is expired
  const { data: friends } = useGetFriendsQuery(undefined, {
    skip: isTokenExpired(token),
  });

  const [addFriend] = useAddFriendMutation();
  const [removeFriend] = useRemoveFriendMutation();
  const isFriend = friends?.some((friend) => friend.id === selectedUserId);

  const handleAddFriend = async () => {
    if (isTokenExpired(token)) {
      dispatch(logout());
      navigate("/login");
      return;
    }
    try {
      await addFriend(selectedUserId).unwrap();
      dispatch(postsAPI.util.invalidateTags(['Posts'])); // ✅ Refresh Feed
    } catch (err) {
      console.error("Error adding friend:", err);
    }
  };

  const handleRemoveFriend = async () => {
    if (isTokenExpired(token)) {
      dispatch(logout());
      navigate("/login");
      return;
    }
    try {
      await removeFriend(selectedUserId).unwrap();
      dispatch(postsAPI.util.invalidateTags(['Posts'])); // ✅ Refresh Feed
    } catch (err) {
      console.error("Error removing friend:", err);
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "Unknown";
    return new Intl.DateTimeFormat("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    }).format(new Date(dateString));
  };

  // ✅ Set profile title dynamically
  const profileTitle = selectedUserId === authUserId ? "My Profile" : "User Profile";

  return (
    <div className={styles.profileContent}>
      <div className={styles.profileInfo}>
        <div className={styles.profileTitle}>
          <h2>{profileTitle}</h2>
        </div>

        <div><strong>Name:</strong> {user?.name ?? "N/A"}</div>
        <div><strong>Email:</strong> {user?.email ?? "N/A"}</div>
        <div><strong>Username:</strong> {user?.username ?? "N/A"}</div>
        <div><strong>Status:</strong> {user?.status ?? "N/A"}</div>
        <div><strong>Role:</strong> {user?.role ?? "N/A"}</div>
        <div><strong>Status Message:</strong> {user?.statusMessage ?? "No status"}</div>
        <div><strong>Bio:</strong> {user?.bio ?? "No bio available"}</div>
        <div><strong>Last Login:</strong> {formatDateTime(user?.lastLogin)}</div>
        <div><strong>Last Updated:</strong> {formatDateTime(user?.updatedAt)}</div>
      </div>

      <div className={styles.profileFooter}>
        {(selectedUserId === authUserId || authUserRole === "ADMIN") && (
          <button className={styles.editLink} onClick={onEdit}>Edit Profile</button>
        )}

        {selectedUserId !== authUserId && (
          isFriend ? (
            <button className={styles.removeFriend} onClick={handleRemoveFriend}>Remove Friend</button>
          ) : (
            <button className={styles.addFriend} onClick={handleAddFriend}>Add Friend</button>
          )
        )}
      </div>
    </div>
  );
}

export default ProfileView;
