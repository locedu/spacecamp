// src/views/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../features/auth/authAPI';  // Import login mutation hook

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();  // RTK Query hook for login mutation
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send POST request with email and password using RTK Query
      const response = await login({ email, password }).unwrap();

      // Save the token to localStorage and update the Redux store
      localStorage.setItem('token', response.token);

      // Redirect to the dashboard upon successful login
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}

export default Login;
