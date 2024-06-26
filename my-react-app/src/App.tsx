import React from 'react';
import { Button } from '@mui/material';
import RegisterForm from './components/RegisterForm';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Register</h1>
        <RegisterForm />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;