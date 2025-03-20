import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetFriendsQuery, useRemoveFriendMutation } from '../features/friends/friendsAPI';
import { postsAPI } from '../features/posts/postsAPI'; // Import postsAPI
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
      await removeFriend(friendId).unwrap();
      dispatch(postsAPI.util.invalidateTags(['Posts'])); // Ensure Feed refreshes
      refetch();
    } catch (err) {
      console.error("Error removing friend:", err);
    }
  };

  return (
    <div className={styles.friendsContainer}>
      <h2 className={styles.friendsHeader}>Friends</h2>

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
