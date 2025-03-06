import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";  // Add useSelector to get user info from store
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";
import { setSelectedUserId } from "../features/profile/profileSlice";  // Import action to update selectedUserId
import "../styles/sidebar.css";

function Sidebar() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.id);  // Get the authenticated user's ID from the store

  // Handle profile click to update selectedUserId
  const handleProfileClick = () => {
    dispatch(setSelectedUserId(userId));
  };

  // Handle logout action
  const handleLogout = () => {
    dispatch({ type: "auth/logout" });  // Assuming the logout action resets the user state
    localStorage.removeItem("token");
  };

  return (
    <div className="sidebar">
      <Button as={Link} to="/dashboard" variant="primary" size="sm" className="sidebar-button mb-3">
        Dashboard
      </Button>

      <ButtonGroup vertical className="w-100">
        {/* Update the "My Profile" button to dispatch the action and update the Redux state */}
        <Button
          variant="primary"
          size="sm"
          className="sidebar-button"
          onClick={handleProfileClick}  // Handle profile click
        >
          My Profile
        </Button>
        <Button as={Link} to="posts" variant="primary" size="sm" className="sidebar-button">
          Feed
        </Button>
        <Button as={Link} to="notifications" variant="primary" size="sm" className="sidebar-button">
          Notifications
        </Button>
        <Button as={Link} to="activity" variant="primary" size="sm" className="sidebar-button">
          Activity
        </Button>
        <Button as={Link} to="friends" variant="primary" size="sm" className="sidebar-button">
          Friends
        </Button>
      </ButtonGroup>

      <Button variant="primary" size="sm" className="sidebar-button logout-button" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Sidebar;
