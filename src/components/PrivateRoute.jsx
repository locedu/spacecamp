// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ element }) {
  const isAuthenticated = useSelector(state => state.auth.token); // Check if the user is authenticated

  return isAuthenticated ? element : <Navigate to="/login" />;
}

export default PrivateRoute;
