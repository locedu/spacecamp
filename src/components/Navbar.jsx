// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import '../styles/navbar.css';

function Navbar() {
  const token = useSelector((state) => state.auth.token); // Check if the user is authenticated
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'auth/logout' }); // Dispatch the logout action to clear token from Redux
  };

  return (
    <nav className="navbar">
      <ul>
        {!token ? (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <li><button onClick={handleLogout}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
