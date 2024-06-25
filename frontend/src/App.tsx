// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ProtectedComponent from './components/ProtectedComponent';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  // 提供一个有效的 closeModal 函数以避免 eslint 错误
  const closeModal = () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  };

  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm closeModal={closeModal} />} />
            <Route path="/protected" element={<ProtectedComponent />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;