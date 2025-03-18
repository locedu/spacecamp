import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";  
import { useLocation, Link } from "react-router-dom";
import { useGetAllUsersQuery, useSearchUsersQuery } from "../features/user/userAPI"; // ✅ Import API hooks
import { setSelectedUserId } from "../features/profile/profileSlice";  
import styles from "../styles/Directory.module.css";  

const Directory = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("username");

  const dispatch = useDispatch();
  const location = useLocation();
  const selectedUserId = useSelector((state) => state.profile.selectedUserId);

  // ✅ Fetch all users when there's no search query
  const {
    data: allUsers = [],
    error: allUsersError,
    isLoading: allUsersLoading,
  } = useGetAllUsersQuery(undefined, { skip: query.length > 0 });

  // ✅ Fetch users based on search input
  const {
    data: searchedUsers = [],
    error: searchError,
    isLoading: searchLoading,
  } = useSearchUsersQuery({ query, filter }, { skip: query.length === 0 });

  // ✅ Use search results if query exists, otherwise use all users
  const users = query.length > 0 ? searchedUsers : allUsers;

  const handleUserClick = (userId) => {
    dispatch(setSelectedUserId(userId));
  };

  // ✅ Determine route
  const isDashboard = location.pathname === "/dashboard";
  const isDirectoryPage = location.pathname === "/dashboard/directory";

  // ✅ Limit users to first 5 if on dashboard
  const visibleUsers = isDashboard ? users.slice(0, 5) : users;

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
      {(searchLoading || allUsersLoading) && <p className={styles.loadingText}>Loading users...</p>}
      {(searchError || allUsersError) && <p className={styles.errorText}>Error loading users</p>}

      {/* Table to display users */}
      {visibleUsers.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {visibleUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <span
                      className={styles.userLink}
                      onClick={() => handleUserClick(user.id)}
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
      ) : (
        <p className={styles.noResults}>No users found</p>
      )}

      {/* ✅ "View All (#)" link, only on dashboard */}
      {isDashboard && users.length > 5 && (
        <div className={styles.viewAllLinkContainer}>
          <Link to="/dashboard/directory" className={styles.viewAllLink}>
            View All ({users.length})
          </Link>
        </div>
      )}
    </div>
  );
};

export default Directory;
