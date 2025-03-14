import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';  // Import the logout action
import { isTokenExpired } from '../utils/tokenExpiration';  // Import token expiration check

function TokenValidation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token); // Get token from Redux store
  const currentPath = window.location.pathname; // Get the current path

  useEffect(() => {
    // Only check for token expiration if the user is on a protected route
    if (currentPath.startsWith('/dashboard') && isTokenExpired(token)) {
      dispatch(logout());  // Dispatch logout if the token has expired
      navigate('/login');  // Redirect to login
    }
  }, [token, dispatch, navigate, currentPath]);

  return null;  // This component doesn't render anything
}

export default TokenValidation;
