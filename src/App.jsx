// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Feed from './views/Feed';
import Profile from './views/Profile';
import Notifications from './views/Notifications';
import Friends from './views/Friends';
import Activity from './views/Activity';
import Home from './views/Home'; // Import Home route
import Login from './views/Login'; // Import Login route
import Register from './views/Register'; // Import Register route
import AllSections from './views/AllSections'; // Import AllSections component
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/app.css";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />}>
            {/* Render all sections on /dashboard */}
            <Route index element={<AllSections />} />
            {/* Specific sub-routes */}
            <Route path="profile" element={<Profile />} />
            <Route path="feed" element={<Feed />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="friends" element={<Friends />} />
            <Route path="activity" element={<Activity />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
