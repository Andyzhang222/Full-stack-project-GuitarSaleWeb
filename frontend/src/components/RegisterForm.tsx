import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { TextField, Button, Typography, Container } from '@mui/material';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(''); // 清除之前的消息
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email },
      });
      setMessage('User registered successfully!');
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Register
        </Button>
        {message && <Typography color="error" variant="body2">{message}</Typography>}
      </form>
    </Container>
  );
};

export default RegisterForm;