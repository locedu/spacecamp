// src/views/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../features/auth/authAPI';  // Import the register mutation hook
import { TextField, Button, CircularProgress, Box } from '@mui/material';  // MUI components
import '../styles/register.css';  // Import register form styling

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');  // Optional field
  const [register, { isLoading, error }] = useRegisterMutation();  // RTK Query hook for registration
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend using RTK Query
      const response = await register({
        email,
        password,
        username,
        name,
      }).unwrap();

      // If registration is successful, navigate to login
      console.log('Registration successful:', response);
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed. Please check the details and try again.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleRegister}
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
      <h2>Register</h2>

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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

      <TextField
        label="Name (Optional)"
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={isLoading}
        sx={{
          padding: '12px',
        }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
      </Button>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error.message}</p>}
    </Box>
  );
}

export default Register;
