import React, { useEffect } from "react";
import { useGetNotificationsQuery } from "../features/notifications/notificationsAPI";
import { useLocation, Link } from "react-router-dom"; // ✅ Import router utilities
import Notification from "../components/Notification";
import { CircularProgress } from "@mui/material";
import styles from "../styles/Notifications.module.css";

function Notifications() {
  const {
    data: notifications,
    error,
    isLoading,
    refetch,
  } = useGetNotificationsQuery();
  const location = useLocation(); // ✅ Get current route

  // Force a fresh request when the component is mounted or navigated back to
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className={styles.loadingState}>
        <CircularProgress />
        <p>Loading notifications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorMessage}>
        <p>Error loading notifications</p>
      </div>
    );
  }

  // Sort notifications by createdAt (newest first)
  const sortedNotifications = [...(notifications || [])].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // ✅ Check if on "/dashboard"
  const isDashboard = location.pathname === "/dashboard";

  // ✅ Display first 5 notifications if on "/dashboard", otherwise show all
  const displayedNotifications = isDashboard
    ? sortedNotifications.slice(0, 5)
    : sortedNotifications;

  // Determine the link for each notification based on the targetType
  const getNotificationLink = (notification) => {
    switch (notification.targetType) {
      case "POST":
      case "COMMENT":
        return `/dashboard/posts/${notification.targetId}`;
      case "LIKE":
        return `/dashboard/posts/${notification.targetId}`;
      case "FRIEND":
        return `/dashboard/profiles/${notification.targetId}`;
      case "UN_FRIEND":
        return ""; // No link for un-friend, as per requirements
      default:
        return ""; // Default case if no match
    }
  };

  // Create notification text based on the notification type
  const renderNotificationText = (type) => {
    switch (type) {
      case "POST":
        return "A friend added a post.";
      case "COMMENT":
        return "A friend commented on your post.";
      case "LIKE":
        return "A friend liked your post.";
      case "FRIEND":
        return "You have been friended.";
      case "UN_FRIEND":
        return "You have been un-friended.";
      default:
        return "You have a new notification.";
    }
  };

  return (
    <div className={styles.notificationsContainer}>
      <h2>Notifications</h2>
      <div className={styles.notificationsList}>
        {displayedNotifications.length > 0 ? (
          displayedNotifications.map((notification) => {
            const link = getNotificationLink(notification);
            return (
              <Notification
                key={notification.id}
                notification={notification}
                link={link}
                notificationText={renderNotificationText(
                  notification.targetType
                )}
              />
            );
          })
        ) : (
          <p>No new notifications.</p>
        )}
      </div>

      {/* ✅ Show "View All (#)" link only on the dashboard */}
      {isDashboard && (
        <div className={styles.viewAllLinkContainer}>
          <Link to="/dashboard/notifications" className={styles.viewAllLink}>
            View All ({notifications.length})
          </Link>
        </div>
      )}
    </div>
  );
}

export default Notifications;
