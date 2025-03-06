import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector from Redux
import { useSearchUsersQuery } from "../features/user/userAPI";
import { setSelectedUserId } from "../features/profile/profileSlice"; // Import setSelectedUserId action
import "../styles/directory.css"; // ✅ Import styling

const Directory = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("username");

  const dispatch = useDispatch(); // Initialize dispatch
  const selectedUserId = useSelector((state) => state.profile.selectedUserId); // Access selectedUserId from Redux

  // Fetch users based on search input
  const { data: users, error, isLoading } = useSearchUsersQuery(
    { query, filter },
    { skip: query.length === 0 }
  );

  const handleUserClick = (userId) => {
    dispatch(setSelectedUserId(userId)); // Dispatch action to set selected user ID
  };

  return (
    <div className="directory-container">
      <h2 className="directory-title">User Directory</h2>

      {/* Search Bar */}
      <div className="directory-search">
        <input
          type="text"
          className="search-input"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="username">Username</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
      </div>

      {/* Loading & Error Handling */}
      {isLoading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">Error loading users</p>}

      {/* Table to display search results */}
      {users?.length > 0 && (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <span
                    className="user-link"
                    onClick={() => handleUserClick(user.id)} // Dispatch selected userId to Redux
                    style={{ cursor: 'pointer', color: 'blue' }}
                  >
                    {user.name}
                  </span>
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* If no users are found */}
      {query && users?.length === 0 && <p className="no-results">No users found</p>}

      {/* Display selected user ID */}
      <div>
        <strong>Selected User ID: </strong>{selectedUserId || "None"}
      </div>
    </div>
  );
};

export default Directory;
