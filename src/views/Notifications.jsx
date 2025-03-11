import React, { useEffect } from 'react';
import { useGetNotificationsQuery } from '../features/notifications/notificationsAPI';
import Notification from '../components/Notification'; // Import the Notification component
import { CircularProgress } from '@mui/material';
import styles from '../styles/Notifications.module.css'; // Import the CSS module

function Notifications() {
  const { data: notifications, error, isLoading, refetch } = useGetNotificationsQuery();

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
    return <div className={styles.errorMessage}><p>Error loading notifications</p></div>;
  }

  // Sort notifications by createdAt (newest first)
  const sortedNotifications = [...notifications || []].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Determine the link for each notification based on the targetType
  const getNotificationLink = (notification) => {
    let link = '';
    switch (notification.targetType) {
      case 'POST':
        link = `/dashboard/posts/${notification.targetId}`;
        break;
      case 'COMMENT':
        link = `/dashboard/posts/${notification.targetId}`;
        break;
      case 'FRIEND':
        link = `/profile/${notification.targetId}`;
        break;
      case 'UN_FRIEND':
        link = ''; // No link for un-friend, as per requirements
        break;
      default:
        link = ''; // Default case if no match
    }
    return link;
  };

  // Create notification text based on the notification type
  const renderNotificationText = (type) => {
    switch (type) {
      case 'POST':
        return 'A friend added a post.';
      case 'COMMENT':
        return 'A friend commented on your post.';
      case 'LIKE':
        return 'A friend liked your post.';
      case 'FRIEND':
        return 'You have been friended.';
      case 'UN_FRIEND':
        return 'You have been un-friended.';
      default:
        return 'You have a new notification.';
    }
  };

  return (
    <div className={styles.notificationsContainer}>
      <h2>Notifications</h2>
      <div className={styles.notificationsList}>
        {sortedNotifications.length > 0 ? (
          sortedNotifications.map((notification) => {
            const link = getNotificationLink(notification);
            return (
              <Notification
                key={notification.id}
                notification={notification}
                link={link}
                notificationText={renderNotificationText(notification.targetType)}
              />
            );
          })
        ) : (
          <p>No new notifications.</p>
        )}
      </div>
    </div>
  );
}

export default Notifications;
