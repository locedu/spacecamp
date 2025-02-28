// src/views/Dashboard.jsx
import { Link, Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul>
          <li><Link to="feed">Feed</Link></li>
          <li><Link to="profile">Profile</Link></li>
          <li><Link to="notifications">Notifications</Link></li>
          <li><Link to="friends">Friends</Link></li>
        </ul>
      </div>
      <div className="content">
        <h2>Dashboard</h2>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
