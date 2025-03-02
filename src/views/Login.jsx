// src/views/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../features/auth/authAPI';
import { TextField, Button, CircularProgress, Box } from '@mui/material';
import '../styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Convert email to lowercase before sending
      const formattedEmail = email.trim().toLowerCase();

      // Send POST request with formatted email and password
      const response = await login({ email: formattedEmail, password }).unwrap();

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
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: 400,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <h2>Login</h2>

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        required
        value={email}
        onChange={(e) => setEmail(e.target.value.trim().toLowerCase())} // ✅ Auto-lowercase input
      />

      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isLoading}
        sx={{
          padding: '12px',
          marginTop: '20px',
        }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
      </Button>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error.message}</p>}
    </Box>
  );
}

export default Login;
