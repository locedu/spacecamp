import React, { useState, useEffect } from "react";
import styles from "../styles/ProfileEdit.module.css";

function ProfileEdit({ user, onSave, onCancel }) {
  // Define the state for the editable fields
  const [name, setName] = useState(user?.name || "");
  const [statusMessage, setStatusMessage] = useState(user?.statusMessage || "");
  const [bio, setBio] = useState(user?.bio || "");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setStatusMessage(user.statusMessage);
      setBio(user.bio);
    }
  }, [user]);

  const handleSave = () => {
    // Only update the editable fields
    const updatedProfile = { name, statusMessage, bio };
    onSave(updatedProfile); // Call onSave to update the profile in parent
  };

  return (
    <div className={styles.profileEditContainer}>
      <div className={styles.profileEditContent}>
        <div className={styles.profileTitle}>
          <h2>Edit Profile</h2>
        </div>

        {/* Displaying all fields */}
        <div className={styles.profileInfo}>
          <div className={styles.profileTitle}>
            <strong>Name:</strong>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.editField}
            />
          </div>

          <div>
            <strong>Email:</strong> {user?.email || "N/A"}
          </div>

          <div>
            <strong>Username:</strong> {user?.username || "N/A"}
          </div>

          <div className={styles.profileTitle}>
            <strong>Status:</strong> {user?.status || "N/A"}
          </div>

          <div className={styles.profileTitle}>
            <strong>Status Message:</strong>
            <input
              type="text"
              value={statusMessage}
              onChange={(e) => setStatusMessage(e.target.value)}
              className={styles.editField}
            />
          </div>

          <div>
            <strong>Bio:</strong>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={styles.editField}
            />
          </div>

          <div>
            <strong>Last Login:</strong> {user?.lastLogin || "Unknown"}
          </div>

          <div>
            <strong>Last updated:</strong>{" "}
            {new Date(user?.updatedAt).toLocaleDateString() || "Unknown"}
          </div>
        </div>

        {/* Buttons for saving or canceling the changes */}
        <div className={styles.profileEditFooter}>
          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
          <button onClick={onCancel} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;
