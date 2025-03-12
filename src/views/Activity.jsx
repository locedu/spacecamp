import React from 'react';
import styles from '../styles/Activity.module.css'; // Import the CSS module

function Activity() {
  return (
    <div className={styles.activityContainer}>
      <h2>Activity</h2>
      <p>Here you can display the user's posts, comments, and likes.</p>
      {/* You can fetch and display actual user activity data here */}
    </div>
  );
}

export default Activity;
