// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/navbar.css';

function Navbar() {
  const token = useSelector((state) => state.auth.token); // Check if the user is authenticated
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'auth/logout' }); // Dispatch the logout action
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {!token ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
