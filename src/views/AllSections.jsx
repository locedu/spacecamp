// src/views/AllSections.jsx
import Feed from './Feed';
import Profile from './Profile';
import Notifications from './Notifications';
import Friends from './Friends';
import Activity from './Activity';
import Directory from './Directory';

function AllSections() {
  return (
    <div className="all-sections">
      <div className="section-container">
        <Profile />
      </div>
      <div className="section-container">
        <Notifications />
      </div>
      <div className="section-container">
        <Directory />
      </div>

      <div className="section-container">
        <Friends />
      </div>
      <div className="section-container">
        <Feed />
      </div>



      <div className="section-container">
        <Activity />
      </div>

    </div>
  );
}

export default AllSections;
