// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Auth, Hub } from 'aws-amplify';

interface AuthContextProps {
  isAuthenticated: boolean;
  user: any; // 你可以根据实际用户数据类型替换 `any`
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  const checkUserSession = async () => {
    try {
      const session = await Auth.currentSession();
      setIsAuthenticated(true);
      setUser(session);
    } catch {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkUserSession();

    Hub.listen('auth', ({ payload: { event } }) => {
      if (event === 'signIn') {
        checkUserSession();
      } else if (event === 'signOut') {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
  }, []);

  const login = async (username: string, password: string) => {
    await Auth.signIn(username, password);
    await checkUserSession();
  };

  const logout = async () => {
    await Auth.signOut();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};