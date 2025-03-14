import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../features/auth/authAPI"; // ✅ Correct import
import { isTokenExpired } from "../utils/tokenExpiration";
import styles from "../styles/ProfileEdit.module.css";

function ProfileEdit({ user, onSave, onCancel }) {
  const token = useSelector((state) => state.auth.token);
  const [updateUser] = useUpdateUserMutation();

  // ✅ Ensure default values prevent uncontrolled input warnings
  const [name, setName] = useState(user?.name ?? "");
  const [statusMessage, setStatusMessage] = useState(user?.statusMessage ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setStatusMessage(user.statusMessage ?? "");
      setBio(user.bio ?? "");
    }
  }, [user]);

  const handleSave = async () => {
    if (isTokenExpired(token)) return;
    try {
      await updateUser({ name, statusMessage, bio }).unwrap();
      onSave(); // ✅ Trigger parent refresh
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  return (
    <div className={styles.profileEditContainer}>
      <div className={styles.profileEditContent}>
        <h2 className={styles.profileTitle}>Edit Profile</h2>

        <div className={styles.profileInfo}>
          <div className={styles.profileTitle}>
            <strong>Name:</strong>
            <input 
              type="text" 
              value={name ?? ""}  // ✅ Ensures value is never null/undefined
              onChange={(e) => setName(e.target.value)} 
              className={styles.editField} 
            />
          </div>

          <div><strong>Email:</strong> {user?.email ?? "N/A"}</div>
          <div><strong>Username:</strong> {user?.username ?? "N/A"}</div>

          <div className={styles.profileTitle}>
            <strong>Status Message:</strong>
            <input 
              type="text" 
              value={statusMessage ?? ""}  // ✅ Ensures value is never null/undefined
              onChange={(e) => setStatusMessage(e.target.value)} 
              className={styles.editField} 
            />
          </div>

          <div>
            <strong>Bio:</strong>
            <textarea 
              value={bio ?? ""}  // ✅ Ensures value is never null/undefined
              onChange={(e) => setBio(e.target.value)} 
              className={styles.editField} 
            />
          </div>
        </div>

        <div className={styles.profileEditFooter}>
          <button onClick={handleSave} className={styles.saveButton}>Save</button>
          <button onClick={onCancel} className={styles.cancelButton}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;
