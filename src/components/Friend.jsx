import React from 'react';
import styles from '../styles/Friend.module.css'; // Import the CSS module

function Friend({ friend, handleRemoveFriend }) {
  return (
    <tr className={styles.friendRow}>
      <td className={styles.friendName}>{friend.name}</td>
      <td className={styles.friendUsername}>@{friend.username}</td>
      <td className={styles.friendActions}>
        <span 
          onClick={() => handleRemoveFriend(friend.id)} 
          className={styles.removeLink}
        >
          Remove
        </span>
      </td>
    </tr>
  );
}

export default Friend;
