import React, { useEffect } from 'react';
import { useGetFriendsQuery, useRemoveFriendMutation } from '../features/friends/friendsAPI';
import { AppBar, Toolbar, Typography } from '@mui/material';
import '../styles/friends.css';

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
    return <div className="loading-state"><p>Loading friends...</p></div>;
  }

  if (error) {
    return <div className="error-message"><p>Error loading friends</p></div>;
  }

  if (!friends || friends.length === 0) {
    return <div className="loading-state"><p>Nothing in friends list.</p></div>;
  }

  return (
    <div className="friends-container">
      <AppBar position="static" color="primary" className="friends-appbar">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Friends List
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Friends table */}
      <table className="friends-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {friends.map((friend) => (
            <tr key={friend.id}>
              <td>{friend.name}</td>
              <td>@{friend.username}</td>
              <td>
                <button onClick={() => handleRemoveFriend(friend.id)} className="remove-button">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Friends;
