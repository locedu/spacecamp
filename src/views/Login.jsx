import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../features/auth/authAPI';
import { TextField, Button, CircularProgress, Box, Typography } from '@mui/material';
import '../styles/login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message before attempting login

    try {
      const formattedEmail = email.trim().toLowerCase();
      const response = await login({ email: formattedEmail, password }).unwrap();

      localStorage.setItem('token', response.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);

      // Extract error message from backend response
      const errorMsg = err?.data?.error || 'Login failed. Please check your credentials.';
      setErrorMessage(errorMsg);
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
        onChange={(e) => setEmail(e.target.value.trim().toLowerCase())}
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

      {errorMessage && (
        <Typography color="error" sx={{ textAlign: 'center' }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
}

export default Login;
