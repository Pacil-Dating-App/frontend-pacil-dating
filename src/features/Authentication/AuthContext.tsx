import Cookies from 'js-cookie';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (userData: UserData, token: string) => void;
  logout: () => void;
  addUser: (userData: UserData) => void;
  userData: UserData | null;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

interface UserData {
  username: string;
  password: string;
  // Add other user data fields as needed
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (Cookies.get('Authentication')) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const storedUserData = sessionStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    }
  }, []);

  const login = (userData: UserData, token: string) => {
    setIsAuthenticated(true);
    setUserData(userData);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userData');
  };

  const addUser = (userData: UserData) => setUserData(userData);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, addUser, userData, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
