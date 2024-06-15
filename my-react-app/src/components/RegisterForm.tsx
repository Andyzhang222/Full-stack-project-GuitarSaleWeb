import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(''); // Clear any previous messages
    try {
      console.log('Sending request to backend...');
      const response = await axios.post('http://localhost:5001/api/users', {
        username,
        password,
        email,
      });
      console.log('User registered:', response.data);
      setMessage('User registered successfully!');
    } catch (error: any) {
      console.error('Error registering user:', error);
      if (error.response && error.response.data) {
        // Server responded with a status code out of the range of 2xx
        setMessage(`Error: ${error.response.data}`);
      } else if (error.request) {
        // Request was made but no response was received
        setMessage(
          'Error: No response from the server. Please try again later.'
        );
      } else {
        // Something else happened while setting up the request
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">Register</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RegisterForm;