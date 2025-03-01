// src/components/Sidebar.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap"; // React Bootstrap import
import "../styles/sidebar.css"; // Import the updated CSS

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "auth/logout" }); // Dispatch the logout action to clear token from Redux
    localStorage.removeItem("token"); // Optionally remove the token from localStorage
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="sidebar">
      <Button
        as={Link}
        to="/dashboard"
        variant="primary"
        size="sm"
        className="sidebar-button mb-3"
      >
        Dashboard
      </Button>
      {/* React Bootstrap ButtonGroup for main buttons */}
      <ButtonGroup vertical className="w-100">
        <Button
          as={Link}
          to="profile"
          variant="primary"
          size="sm"
          className="sidebar-button"
        >
          Profile
        </Button>
        <Button
          as={Link}
          to="feed"
          variant="primary"
          size="sm"
          className="sidebar-button"
        >
          Feed
        </Button>
        <Button
          as={Link}
          to="notifications"
          variant="primary"
          size="sm"
          className="sidebar-button"
        >
          Notifications
        </Button>
        <Button
          as={Link}
          to="activity"
          variant="primary"
          size="sm"
          className="sidebar-button"
        >
          Activity
        </Button>
        <Button
          as={Link}
          to="friends"
          variant="primary"
          size="sm"
          className="sidebar-button"
        >
          Friends
        </Button>
      </ButtonGroup>

      {/* Logout button below the ButtonGroup */}
      <Button
        variant="primary"
        size="sm"
        className="sidebar-button logout-button"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}

export default Sidebar;
