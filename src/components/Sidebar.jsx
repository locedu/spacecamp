import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";
import Search from "./Search"; // Import Search component
import "../styles/sidebar.css";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // State for search

  const handleLogout = () => {
    dispatch({ type: "auth/logout" });
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <Search onSearch={setSearchQuery} /> {/* ✅ Add Search Component */}

      <Button as={Link} to="/dashboard" variant="primary" size="sm" className="sidebar-button mb-3">
        Dashboard
      </Button>

      <ButtonGroup vertical className="w-100">
        <Button as={Link} to="profile" variant="primary" size="sm" className="sidebar-button">
          Profile
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
