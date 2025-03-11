import React, { useEffect } from 'react';
import { useGetNotificationsQuery } from '../features/notifications/notificationsAPI';
import Notification from '../components/Notification'; // Import the new Notification component
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

  return (
    <div className={styles.notificationsContainer}>
      <h2>Notifications</h2>
      <div className={styles.notificationsList}>
        {sortedNotifications.length > 0 ? (
          sortedNotifications.map((notification) => (
            <Notification key={notification.id} notification={notification} /> // Use the Notification component
          ))
        ) : (
          <p>No new notifications.</p>
        )}
      </div>
    </div>
  );
}

export default Notifications;
