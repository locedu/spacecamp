// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const token = useSelector((state) => state.auth.token); // Get the auth token from Redux state

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
          <></> // Future Logout link will be added when Login is implemented
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
