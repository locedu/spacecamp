// src/App.jsx
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
            {/* Nested Routes under /dashboard */}
            <Route path="feed" element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="friends" element={<Friends />} />
            <Route path="activity" element={<Activity />} /> {/* Add Activity route */}
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
