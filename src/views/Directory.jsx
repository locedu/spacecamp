import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector from Redux
import { useSearchUsersQuery } from "../features/user/userAPI";
import { setSelectedUserId } from "../features/profile/profileSlice"; // Import setSelectedUserId action
import styles from "../styles/Directory.module.css"; // ✅ Import CSS module

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
    <div className={styles.directoryContainer}>
      <h2 className={styles.directoryTitle}>Directory</h2>

      {/* Search Bar */}
      <div className={styles.directorySearch}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* Radio buttons for filtering */}
        <div className={styles.filterRadio}>
          <label>
            <input
              type="radio"
              name="filter"
              value="username"
              checked={filter === "username"}
              onChange={(e) => setFilter(e.target.value)}
            />
            Username
          </label>
          <label>
            <input
              type="radio"
              name="filter"
              value="name"
              checked={filter === "name"}
              onChange={(e) => setFilter(e.target.value)}
            />
            Name
          </label>
        </div>
      </div>

      {/* Loading & Error Handling */}
      {isLoading && <p className={styles.loadingText}>Loading...</p>}
      {error && <p className={styles.errorText}>Error loading users</p>}

      {/* Table to display search results */}
      {users?.length > 0 && (
        <div className={styles.tableContainer}>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <span
                      className={styles.userLink}
                      onClick={() => handleUserClick(user.id)} // Dispatch selected userId to Redux
                    >
                      {user.name}
                    </span>
                  </td>
                  <td>{user.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* If no users are found */}
      {query && users?.length === 0 && <p className={styles.noResults}>No users found</p>}

      {/* Display selected user ID */}
      <div>
        {/* <strong>Selected User ID: </strong>{selectedUserId || "None"} */}
      </div>
    </div>
  );
};

export default Directory;
