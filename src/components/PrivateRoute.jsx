import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { isTokenExpired } from "../utils/tokenExpiration";

function PrivateRoute({ element }) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  if (!token || isTokenExpired(token)) {
    dispatch(logout()); // Clear expired token
    return <Navigate to="/login" replace />; // Redirect to login
  }

  return element;
}

export default PrivateRoute;
