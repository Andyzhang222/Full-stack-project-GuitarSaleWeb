import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import LoginSuccess from './components/LoginSuccess'; // 导入新的组件
import ProtectedComponent from './components/ProtectedComponent';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/register" element={<MainPage />} />
            <Route path="/login" element={<MainPage />} />
            <Route path="/login-success" element={<LoginSuccess />} /> {/* 添加新的路由 */}
            <Route path="/protected" element={<ProtectedComponent />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;