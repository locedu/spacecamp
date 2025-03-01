// src/views/Dashboard.jsx
import Sidebar from '../components/Sidebar';
import Feed from './Feed';
import Profile from './Profile';
import Notifications from './Notifications';
import Friends from './Friends';
import Activity from './Activity';
import '../styles/dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="content">
        <div className="dashboard-row">
          {/* Render all sections side by side */}
          <div className="dashboard-section">
            <Feed />
          </div>

          <div className="dashboard-section">
            <Profile />
          </div>

          <div className="dashboard-section">
            <Notifications />
          </div>

          <div className="dashboard-section">
            <Friends />
          </div>

          <div className="dashboard-section">
            <Activity />
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}

export default Dashboard;
