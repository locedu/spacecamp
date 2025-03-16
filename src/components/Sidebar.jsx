import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";  
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";
import { setSelectedUserId } from "../features/profile/profileSlice";  
import styles from "../styles/Sidebar.module.css"; // ✅ Import CSS module

function Sidebar() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.id);  

  const handleProfileClick = () => {
    dispatch(setSelectedUserId(userId));
  };

  const handleLogout = () => {
    dispatch({ type: "auth/logout" });
    localStorage.removeItem("token");
  };

  return (
    <div className={styles.sidebar}>
      <Button as={Link} to="/dashboard" variant="primary" size="sm" className={styles.dashboardButton}>
        Dashboard
      </Button>

      <ButtonGroup vertical className="w-100">
        <Button
          variant="primary"
          size="sm"
          className={styles.sidebarButton}
          onClick={handleProfileClick}  
        >
          My Profile
        </Button>
        <Button as={Link} to="posts" variant="primary" size="sm" className={styles.sidebarButton}>
          Feed
        </Button>
        <Button as={Link} to="notifications" variant="primary" size="sm" className={styles.sidebarButton}>
          Notifications
        </Button>
        <Button as={Link} to="activity" variant="primary" size="sm" className={styles.sidebarButton}>
          Activity
        </Button>
        <Button as={Link} to="friends" variant="primary" size="sm" className={styles.sidebarButton}>
          Friends
        </Button>
      </ButtonGroup>

      <Button 
        variant="primary" 
        size="sm" 
        className={styles.logoutButton} 
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}

export default Sidebar;
