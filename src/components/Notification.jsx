import React from 'react';
import { Link } from 'react-router-dom'; // For navigation links
import styles from '../styles/Notification.module.css'; // Import the CSS module

function Notification({ notification }) {
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

  const notificationContent = (
    <>
      <span className={styles.timestamp}>
        {new Date(notification.createdAt).toLocaleString()}:
      </span>
      <span className={styles.message}>
        {renderNotificationText(notification.targetType)}
      </span>
    </>
  );

  let link;
  if (notification.targetType === 'POST') {
    link = `/dashboard/posts/${notification.targetId}`;
  } else if (notification.targetType === 'COMMENT') {
    link = `/posts/${notification.targetId}`;
  } else if (notification.targetType === 'FRIEND') {
    link = `/profile/${notification.targetId}`;
  }

  return (
    <div className={styles.notification}>
      {notification.read ? (
        <span>{notificationContent}</span>
      ) : (
        <Link to={link}>{notificationContent}</Link>
      )}
    </div>
  );
}

export default Notification;
