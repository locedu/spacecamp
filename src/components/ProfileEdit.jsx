import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../features/auth/authAPI";
import { logout } from "../features/auth/authSlice";
import { isTokenExpired } from "../utils/tokenExpiration";
import styles from "../styles/ProfileEdit.module.css";

function ProfileEdit({ user, onSave, onCancel }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [updateUser, { isLoading, isError, error }] = useUpdateUserMutation();

  // ✅ Track editable fields and original values
  const [name, setName] = useState(user?.name ?? "");
  const [statusMessage, setStatusMessage] = useState(user?.statusMessage ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [hasChanges, setHasChanges] = useState(false); // ✅ Track changes

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setStatusMessage(user.statusMessage ?? "");
      setBio(user.bio ?? "");
    }
  }, [user]);

  // ✅ Detect changes in form fields
  useEffect(() => {
    const hasChanged =
      name !== (user?.name ?? "") ||
      statusMessage !== (user?.statusMessage ?? "") ||
      bio !== (user?.bio ?? "");
    setHasChanges(hasChanged);
  }, [name, statusMessage, bio, user]);

  const handleSave = async () => {
    if (isTokenExpired(token)) {
      dispatch(logout());
      navigate("/login");
      return;
    }

    try {
      console.log("🔹 Sending update request:", { name, statusMessage, bio });

      const response = await updateUser({ name, statusMessage, bio }).unwrap();
      console.log("✅ Profile updated successfully:", response);

      onSave();
    } catch (err) {
      console.error("❌ Error saving profile:", err);
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
              value={name}  
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
        </div>

        <div className={styles.profileEditFooter}>
          <button onClick={onCancel} className={styles.cancelButton}>Cancel</button>
          <button 
            onClick={handleSave} 
            className={styles.saveButton} 
            disabled={!hasChanges || isLoading} // ✅ Disable unless changes are detected
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>

        {isError && <p className={styles.errorMessage}>Error: {error?.data?.message || "Failed to save profile"}</p>}
      </div>
    </div>
  );
}

export default ProfileEdit;
