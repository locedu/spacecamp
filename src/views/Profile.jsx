import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useGetProfileByIdQuery } from "../features/profile/profileAPI";
import { setSelectedUserId } from "../features/profile/profileSlice";
import { useGetFriendsQuery } from "../features/friends/friendsAPI";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { isTokenExpired } from "../utils/tokenExpiration";
import ProfileView from "../components/ProfileView";
import ProfileEdit from "../components/ProfileEdit";
import styles from "../styles/Profile.module.css";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const selectedUserId = useSelector((state) => state.profile.selectedUserId);
  const authUserId = useSelector((state) => state.auth.user?.id);
  const authUserRole = useSelector((state) => state.auth.user?.role);
  const [isEditMode, setIsEditMode] = useState(false);

  // ✅ Redirect if token expires
  useEffect(() => {
    if (isTokenExpired(token)) {
      dispatch(logout());
      navigate("/login");
    }
  }, [token, dispatch, navigate]);

  // ✅ Ensure selectedUserId is set (only if it hasn't been set already)
  useEffect(() => {
    if (!selectedUserId && authUserId) {
      console.log("Setting selectedUserId:", authUserId); // Debugging
      dispatch(setSelectedUserId(authUserId));
    }
  }, [selectedUserId, authUserId, dispatch]);

  // ✅ Fetch user profile only if selectedUserId is valid
  const { data: userResponse, isLoading, error, refetch, isUninitialized } = useGetProfileByIdQuery(selectedUserId, {
    skip: !selectedUserId || isTokenExpired(token),
  });

  // ✅ Extract user object from the response
  const user = userResponse?.user; // ✅ Fix applied here

  // ✅ Ensure refetch is only called when the query is initialized
  useEffect(() => {
    if (selectedUserId && !isUninitialized) {
      refetch();
    }
  }, [selectedUserId, refetch, isUninitialized]);

  // ✅ Fetch friends list
  const { data: friends, isLoading: friendsLoading, error: friendsError } = useGetFriendsQuery(undefined, {
    skip: isTokenExpired(token),
  });

  const [isFriend, setIsFriend] = useState(false);

  // ✅ Ensure friendship status updates when friends or userResponse change
  useEffect(() => {
    if (friends && user) {
      setIsFriend(friends.some((friend) => friend.id === user.id));
    }
  }, [friends, user]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSave = async () => {
    try {
      if (!isUninitialized) {
        await refetch(); // ✅ Ensure refetch is only called if query has been initialized
      }
      setIsEditMode(false);
    } catch (err) {
      console.error("Error refreshing profile:", err);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

  if (isLoading || friendsLoading) {
    return <div className={styles.profileContainer}>Loading profile...</div>;
  }

  if (error || friendsError) {
    return <div className={styles.profileContainer}>Error loading profile</div>;
  }

  if (!user) {
    return <div className={styles.profileContainer}>No profile data available</div>;
  }

  return (
    <div className={styles.profileContainer}>
      {isEditMode ? (
        <ProfileEdit user={user} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <ProfileView 
          user={user} 
          onEdit={(selectedUserId === authUserId || authUserRole === "ADMIN") ? handleEditClick : null} 
        />
      )}
    </div>
  );
}

export default Profile;
