import React, { useEffect } from 'react';
import { useGetFriendsQuery, useRemoveFriendMutation } from '../features/friends/friendsAPI'; // Import hooks
import Friend from '../components/Friend'; // Import the Friend component
import styles from '../styles/Friends.module.css'; // Import the CSS module

function Friends() {
  // Fetch friends list
  const { data: friends, error, isLoading, refetch } = useGetFriendsQuery();
  
  // Mutations for removing a friend
  const [removeFriend] = useRemoveFriendMutation();

  // Refetch the friends list when the component is mounted or updated
  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleRemoveFriend = async (friendId) => {
    try {
      await removeFriend(friendId); // Remove friend by ID
      refetch(); // Refetch the friends list after removal
    } catch (err) {
      console.error("Error removing friend:", err); // Handle error if something goes wrong
    }
  };

  if (isLoading) {
    return <div className={styles.loadingState}><p>Loading friends...</p></div>;
  }

  if (error) {
    return <div className={styles.errorMessage}><p>Error loading friends</p></div>;
  }

  if (!friends || friends.length === 0) {
    return <div className={styles.loadingState}><p>No friends available.</p></div>;
  }

  return (
    <div className={styles.friendsContainer}>
      <h2 className={styles.friendsHeader}>Friends List</h2>
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
    </div>
  );
}

export default Friends;
