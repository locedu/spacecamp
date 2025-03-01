import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Feed from './views/Feed';
import Profile from './views/Profile';
import Notifications from './views/Notifications';
import Friends from './views/Friends';
import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home'; // Home route
import Activity from './views/Activity'; // Import the Activity component
import PrivateRoute from './components/PrivateRoute';  // Import PrivateRoute
import Navbar from './components/Navbar';  // Import Navbar
// import './styles/app.css';  // Import the new app.css file
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar will be visible on all routes */}

      <main className="content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />}>
            {/* Nested Routes under /dashboard (for full layout with multiple sections) */}
            <Route path="feed" element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="friends" element={<Friends />} />
            <Route path="activity" element={<Activity />} /> {/* Activity section on dashboard */}
          </Route>

          {/* Specific Targeted Views (for focused views with no layout) */}
          <Route path="/dashboard/notifications" element={<Notifications />} /> {/* Specific notifications view */}
          <Route path="/dashboard/directory" element={<Friends />} /> {/* Example: Specific directory view */}
          <Route path="/dashboard/activity" element={<Activity />} /> {/* Direct access to Activity view */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;
