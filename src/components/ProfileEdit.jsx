import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../features/profile/profileAPI"; // ✅ Updated API
import { logout } from "../features/auth/authSlice";
import { isTokenExpired } from "../utils/tokenExpiration";
import styles from "../styles/ProfileEdit.module.css";

function ProfileEdit({ user, onSave, onCancel }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const authUserId = useSelector((state) => state.auth.user?.id);
  const authUserRole = useSelector((state) => state.auth.user?.role);

  const [updateProfile, { isLoading, isError, error }] = useUpdateProfileMutation(); // ✅ Updated mutation

  // ✅ Track editable fields and original values
  const [name, setName] = useState(user?.name ?? "");
  const [statusMessage, setStatusMessage] = useState(user?.statusMessage ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [status, setStatus] = useState(user?.status ?? "ACTIVE"); // Default to ACTIVE
  const [hasChanges, setHasChanges] = useState(false);

  const isEditingSelf = authUserId === user?.id;
  const isAdmin = authUserRole === "ADMIN";

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setStatusMessage(user.statusMessage ?? "");
      setBio(user.bio ?? "");
      setStatus(user.status ?? "ACTIVE");
    }
  }, [user]);

  // ✅ Detect changes in form fields
  useEffect(() => {
    const hasChanged =
      name !== (user?.name ?? "") ||
      statusMessage !== (user?.statusMessage ?? "") ||
      bio !== (user?.bio ?? "") ||
      (isAdmin && !isEditingSelf && status !== (user?.status ?? "ACTIVE")); // Admin-only status change

    setHasChanges(hasChanged);
  }, [name, statusMessage, bio, status, isAdmin, isEditingSelf, user]);

  const handleSave = async () => {
    if (isTokenExpired(token)) {
      dispatch(logout());
      navigate("/login");
      return;
    }

    try {
      const updateData = isAdmin && !isEditingSelf
        ? { status } // ✅ Admins only update status
        : { name, statusMessage, bio }; // Regular users update their own fields

      console.log("🔹 Sending update request:", { userId: user.id, updateData });

      await updateProfile({ userId: user.id, updateData }).unwrap();
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
              disabled={isAdmin && !isEditingSelf} // Admins can't change name of others
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
              disabled={isAdmin && !isEditingSelf} // Admins can't edit other users' status message
            />
          </div>

          <div>
            <strong>Bio:</strong>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={styles.editField}
              disabled={isAdmin && !isEditingSelf} // Admins can't edit other users' bio
            />
          </div>

          <div className={styles.profileTitle}>
            <strong>Status:</strong>
            {isAdmin && !isEditingSelf ? (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={styles.editField}
              >
                <option value="ACTIVE">Active</option>
                <option value="BLOCKED">Blocked</option>
              </select>
            ) : (
              <span>{status}</span> // Show status as read-only for regular users and self-editing admins
            )}
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
