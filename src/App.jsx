import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import TokenValidation from "./components/TokenValidation";

import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import Notifications from "./views/Notifications";
import Friends from "./views/Friends";
import Activity from "./views/Activity";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import AllSections from "./views/AllSections";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

import Feed from "./views/Feed"; // Keeping Feed.jsx as is
import NewPost from "./views/NewPost";
import EditPost from "./views/EditPost";
import ViewPost from "./views/ViewPost";
import NewComment from "./views/NewComment";
import EditComment from "./views/EditComment";  // ✅ Import EditComment page

import Directory from "./views/Directory"; // ✅ Ensure Directory is imported

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/app.css";

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <Router>
      <TokenValidation token={token} />
      <Navbar />
      <main className="content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />}>
            <Route index element={<AllSections />} />
            <Route path="friends" element={<Friends />} />
            <Route path="posts" element={<Feed />} />
            <Route path="profile/:userId" element={<Profile />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="activity" element={<Activity />} />
            <Route path="directory" element={<Directory />} /> 

            {/* Post & Comment Routes */}
            <Route path="posts/new" element={<NewPost />} />  
            <Route path="posts/:id/edit" element={<EditPost />} />  
            <Route path="posts/:id" element={<ViewPost />} />  
            <Route path="posts/:id/comment" element={<NewComment />} />  
            <Route path="comments/:id/edit" element={<EditComment />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
