import React, { useEffect } from 'react';
import { useGetActivitiesQuery } from '../features/activity/activityAPI'; // Import the RTK Query hook
import ActivityItem from '../components/ActivityItem'; // Import the ActivityItem component
import { CircularProgress } from '@mui/material';
import styles from '../styles/Activity.module.css'; // Import the CSS module

function Activity() {
  const { data: activities, error, isLoading, refetch } = useGetActivitiesQuery();

  // Force a fresh request when the component is mounted or navigated back to
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className={styles.loadingState}>
        <CircularProgress />
        <p>Loading activities...</p>
      </div>
    );
  }

  if (error) {
    return <div className={styles.errorMessage}><p>Error loading activities</p></div>;
  }

  // Sort activities by createdAt (newest first)
  const sortedActivities = [...activities || []].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Create activity text based on ActivityType (enum)
  const renderActivityText = (activityType) => {
    switch (activityType) {
      case 'POST':
        return 'You submitted a post.';
      case 'COMMENT':
        return 'You commented on a post.';
      case 'LIKE':
        return 'You liked a post.';
      case 'FRIEND':
        return 'You friended someone.';
      case 'UN_FRIEND':
        return 'You unfriended someone.';
      default:
        return 'You have a new activity.';
    }
  };

  // Format timestamp with 12-hour format (date, hour, minute, seconds, AM/PM)
  const formatTimestamp = (timestamp) => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // 12-hour format with AM/PM
    };
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', options); // Returns formatted string in the desired format
  };

  return (
    <div className={styles.activitiesContainer}>
      <h2>User Activities</h2>
      <div className={styles.activitiesList}>
        {sortedActivities.length > 0 ? (
          sortedActivities.map((activity) => {
            // Use activity.targetType to get the correct activity text
            const activityText = renderActivityText(activity.targetType);
            const formattedTimestamp = formatTimestamp(activity.createdAt); // Format the timestamp

            return (
              <ActivityItem
                key={activity.id}
                activity={activity}
                activityText={activityText} // Pass the correct activity text
                timestamp={formattedTimestamp} // Pass the formatted timestamp
              />
            );
          })
        ) : (
          <p>No activities to display.</p>
        )}
      </div>
    </div>
  );
}

export default Activity;
