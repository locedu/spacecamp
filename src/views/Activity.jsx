import React from "react";
import { useGetActivitiesQuery } from "../features/activity/activityAPI";
import { isTokenExpired } from "../utils/tokenExpiration";
import { useSelector } from "react-redux";
import styles from "../styles/Activity.module.css";

function Activity() {
  const token = useSelector((state) => state.auth.token);

  // Fetch user activities, skipping if token is expired
  const { data: activities, isLoading, error } = useGetActivitiesQuery(undefined, {
    skip: isTokenExpired(token),
  });

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

  return (
    <div className={styles.activityContainer}>
      <h2 className={styles.activityTitle}>Recent Activity</h2>
      <table className={styles.activityTable}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Timestamp</th>
            <th className={styles.tableHeader}>Activity</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
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
    </div>
  );
}

export default Activity;
