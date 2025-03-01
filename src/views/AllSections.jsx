// src/views/AllSections.jsx
import Feed from './Feed';
import Profile from './Profile';
import Notifications from './Notifications';
import Friends from './Friends';
import Activity from './Activity';

function AllSections() {
  return (
    <div className="dashboard-row">
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
  );
}

export default AllSections;
