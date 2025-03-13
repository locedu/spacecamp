import React from "react";
import styles from "../styles/ProfileView.module.css"; // Import the CSS module

function ProfileView({ user, onEdit }) {
  const formattedUpdatedAt = user?.updatedAt
    ? new Date(user.updatedAt).toLocaleDateString()
    : "Unknown";

  return (
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
          <strong>Status Message:</strong> {user?.statusMessage || "No status"}
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

      <div className={styles.profileFooter}>
        <button className={styles.editLink} onClick={onEdit}>
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileView;
