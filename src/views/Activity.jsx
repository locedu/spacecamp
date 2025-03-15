import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useGetActivitiesQuery } from "../features/activity/activityAPI";
import { isTokenExpired } from "../utils/tokenExpiration";
import { useSelector } from "react-redux";
import styles from "../styles/Activity.module.css";

function Activity() {
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);

  // Fetch user activities, skipping if token is expired
  const { data: activities, isLoading, error } = useGetActivitiesQuery(undefined, {
    skip: isTokenExpired(token),
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

  // Function to format activity messages
  const getActivityMessage = (targetType) => {
    const messages = {
      LOGIN: "You signed in.",
      LOGOUT: "You signed out.",
      POST: "You added a post.",
      COMMENT: "You commented on a post.",
      LIKE: "You liked a post.",
      UN_LIKE: "You un-liked a post.",
      FRIEND: "You added a friend.",
      UN_FRIEND: "You removed a friend.",
    };
    return messages[targetType] || "Unknown activity.";
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
                {getActivityMessage(activity.targetType)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show "Activity (#)" link only when in dashboard */}
      {isDashboard && (
        <div className={styles.viewAllLinkContainer}>
          <Link to="/dashboard/activity" className={styles.viewAllLink}>
            Activity ({activities.length})
          </Link>
        </div>
      )}
    </div>
  );
}

export default Activity;
