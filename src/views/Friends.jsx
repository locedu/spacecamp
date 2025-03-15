import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetFriendsQuery, useRemoveFriendMutation } from '../features/friends/friendsAPI';
import { activityAPI } from '../features/activity/activityAPI';
import Friend from '../components/Friend';
import styles from '../styles/Friends.module.css';

function Friends() {
  const dispatch = useDispatch();
  const { data: friends, error, isLoading, refetch } = useGetFriendsQuery();
  const [removeFriend] = useRemoveFriendMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleRemoveFriend = async (friendId) => {
    try {
      await removeFriend(friendId);
      refetch();
    } catch (err) {
      console.error("Error removing friend:", err);
    }
  };

  const handleRefreshActivity = () => {
    dispatch(activityAPI.util.invalidateTags(['Activity']));
  };

  return (
    <div className={styles.friendsContainer}>
      <h2 className={styles.friendsHeader}>Friends List</h2>

      {/* Refresh Activity Link (Always Visible) */}
      <div className={styles.refreshActivityContainer}>
        <button className={styles.refreshButton} onClick={handleRefreshActivity}>
          Refresh Activity
        </button>
      </div>

      {isLoading && <div className={styles.loadingState}><p>Loading friends...</p></div>}
      {error && <div className={styles.errorMessage}><p>Error loading friends</p></div>}

      {friends && friends.length > 0 ? (
        <table className={styles.friendsTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {friends.map((friend) => (
              <Friend 
                key={friend.id} 
                friend={friend} 
                handleRemoveFriend={handleRemoveFriend} 
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.noFriends}><p>No friends available.</p></div>
      )}
    </div>
  );
}

export default Friends;
