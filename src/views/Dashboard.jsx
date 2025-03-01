// src/views/Dashboard.jsx
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import '../styles/dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="content">
        <Outlet />
      </div>
      <Sidebar />
    </div>
  );
}

export default Dashboard;
