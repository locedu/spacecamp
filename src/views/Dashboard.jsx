// src/views/Dashboard.jsx
import { Link, Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="feed">Feed</Link></li>
          <li><Link to="profile">Profile</Link></li>
          <li><Link to="notifications">Notifications</Link></li>
        </ul>
      </nav>
      <h2>Dashboard</h2>
      <Outlet />
    </div>
  );
}

export default Dashboard;
