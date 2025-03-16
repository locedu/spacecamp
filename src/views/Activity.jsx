import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useGetActivitiesQuery } from "../features/activity/activityAPI";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { isTokenExpired } from "../utils/tokenExpiration";
import { setSelectedUserId } from "../features/profile/profileSlice";
import styles from "../styles/Activity.module.css";

function Activity() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  // Redirect if token expires
  useEffect(() => {
    if (isTokenExpired(token)) {
      dispatch(logout());
      navigate("/login", { replace: true });
    }
  }, [token, dispatch, navigate]);

  // Fetch user activities, ensuring it auto-refetches when the 'Activity' tag is invalidated
  const { data: activities, isLoading, error } = useGetActivitiesQuery(undefined, {
    skip: isTokenExpired(token),
    refetchOnMountOrArgChange: true, 
  });

  // Determine mode based on the route
  const isDashboard = location.pathname === "/dashboard";
  const title = isDashboard ? "Recent Activity" : "Activity Log";

  if (isLoading) {
    return <div className={styles.activityContainer}>Loading activity...</div>;
  }

  if (error) {
    return <div className={styles.activityContainer}>Error loading activity.</div>;
  }

  if (!activities || activities.length === 0) {
    return <div className={styles.activityContainer}><p className={styles.noActivity}>No activity found.</p></div>;
  }

  // Function to handle clicks on friend/unfriend links
  const handleUserClick = (userId) => {
    dispatch(setSelectedUserId(userId));
  };

  // Function to format activity messages with correct links
  const getActivityMessage = (activity) => {
    const { targetType, targetId } = activity;

    switch (targetType) {
      case "LOGIN":
        return "You signed in.";
      case "LOGOUT":
        return "You signed out.";
      case "POST":
        return <Link to={`/dashboard/posts/${targetId}`}>You added a post.</Link>;
      case "COMMENT":
        return <Link to={`/dashboard/posts/${targetId}`}>You commented on a post.</Link>;
      case "LIKE":
        return <Link to={`/dashboard/posts/${targetId}`}>You liked a post.</Link>;
      case "UN_LIKE":
        return <Link to={`/dashboard/posts/${targetId}`}>You un-liked a post.</Link>;
      case "FRIEND":
        return (
          <Link 
            to={`/dashboard/profile/${targetId}`} 
            onClick={() => handleUserClick(targetId)}
          >
            You added a friend.
          </Link>
        );
      case "UN_FRIEND":
        return (
          <Link 
            to={`/dashboard/profile/${targetId}`} 
            onClick={() => handleUserClick(targetId)}
          >
            You removed a friend.
          </Link>
        );
      default:
        return "Unknown activity.";
    }
  };

  // Show only the first 5 activities if in dashboard
  const displayedActivities = isDashboard ? activities.slice(0, 5) : activities;

  return (
    <div className={styles.activityContainer}>
      <h2 className={styles.activityTitle}>{title}</h2>
      <table className={styles.activityTable}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Timestamp</th>
            <th className={styles.tableHeader}>Activity</th>
          </tr>
        </thead>
        <tbody>
          {displayedActivities.map((activity) => (
            <tr key={activity.id} className={styles.activityRow}>
              <td className={styles.activityTimestamp}>
                {new Date(activity.createdAt).toLocaleString()}
              </td>
              <td className={styles.activityMessage}>
                {getActivityMessage(activity)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show "Activity (#)" link only when in dashboard */}
      {isDashboard && (
        <div className={styles.viewAllLinkContainer}>
          <Link to="/dashboard/activity" className={styles.viewAllLink}>
            View All ({activities.length})
          </Link>
        </div>
      )}
    </div>
  );
}

export default Activity;
