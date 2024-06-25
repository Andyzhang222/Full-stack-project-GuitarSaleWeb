import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { Container, TextField, Button, Typography } from '@mui/material';

Auth.configure(awsconfig);

interface LoginFormProps {
  closeModal: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ closeModal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(''); // 清除之前的消息
    try {
      await Auth.signIn(username, password);
      setMessage('User logged in successfully!');
      closeModal(); // 关闭模态窗口并跳转回主页面
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Login
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
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Login
        </Button>
        {message && <Typography color="error" variant="body2">{message}</Typography>}
      </form>
    </Container>
  );
};

export default LoginForm;