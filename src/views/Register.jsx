// src/views/Register.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../features/auth/authAPI';  // Import the register mutation hook

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
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div>
          <label htmlFor="name">Name (Optional)</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}

export default Register;
