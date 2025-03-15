import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../styles/Navbar.module.css'; // ✅ Import updated CSS module

function Navbar() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'auth/logout' }); // Dispatch the logout action to clear token from Redux
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {!token ? (
          <>
            <li className={styles.navItem}><Link to="/" className={styles.navLink}>Home</Link></li>
            <li className={styles.navItem}><Link to="/login" className={styles.navLink}>Login</Link></li>
            <li className={styles.navItem}><Link to="/register" className={styles.navLink}>Register</Link></li>
          </>
        ) : (
          <li className={styles.navItem}>
            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
