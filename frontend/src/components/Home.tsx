// src/components/Home.tsx

import React, { useState } from 'react';
import Modal from 'react-modal';
import { useAuth } from '../context/AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

Modal.setAppElement('#root'); // 设置 app element

const Home: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  return (
    <div>
      <header>
        <h1>Home</h1>
        {isAuthenticated ? (
          <div>
            <span>Welcome, {user?.username}</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div>
            <button onClick={openLoginModal}>Login</button>
            <button onClick={openRegisterModal}>Register</button>
          </div>
        )}
      </header>

      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        contentLabel="Login Modal"
      >
        <LoginForm closeModal={closeLoginModal} />
      </Modal>

      <Modal
        isOpen={isRegisterModalOpen}
        onRequestClose={closeRegisterModal}
        contentLabel="Register Modal"
      >
        <RegisterForm />
      </Modal>
    </div>
  );
};

export default Home;