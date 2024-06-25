import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

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
      const user = await Auth.signIn(username, password);
      const idToken = user.signInUserSession.idToken.jwtToken;
      const accessToken = user.signInUserSession.accessToken.jwtToken;
      const refreshToken = user.signInUserSession.refreshToken.token;

      // 发送 token 到后端
      await axios.post('http://localhost:3001/login', {
        idToken,
        accessToken,
        refreshToken
      });

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