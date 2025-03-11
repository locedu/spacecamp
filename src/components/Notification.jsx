import React from 'react';
import { Link } from 'react-router-dom'; // For navigation links
import { useMarkAsReadMutation } from '../features/notifications/notificationsAPI'; // Import the mutation
import styles from '../styles/Notification.module.css'; // Import the CSS module

function Notification({ notification, link, notificationText }) {
  const [markAsRead] = useMarkAsReadMutation();

  // Function to handle marking the notification as read when clicked
  const handleNotificationClick = async () => {
    if (!notification.read) {
      await markAsRead(notification.id); // Update the notification to read
    }
  };

  const notificationContent = (
    <>
      <span className={styles.timestamp}>
        {new Date(notification.createdAt).toLocaleString()}:
      </span>
      <span className={styles.message}>
        {notificationText}
      </span>
    </>
  );

  // Apply the "unread" class to the notification when it's unread
  const notificationClass = notification.read ? styles.read : styles.unread;

  return (
    <div className={`${styles.notification} ${notificationClass}`}>
      {/* Both read and unread notifications will have a link now */}
      <Link to={link} onClick={handleNotificationClick}>
        {notificationContent}
      </Link>
    </div>
  );
}

export default Notification;
