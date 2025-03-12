import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import styles from '../styles/Dashboard.module.css';  // Import the CSS module

function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <Sidebar />
    </div>
  );
}

export default Dashboard;
