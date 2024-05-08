import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    addUser: (userData: UserData) => void;
    userData: UserData | null;
  }
  
  interface UserData {
    username: string;
    password: string;
    // Add other user data fields as needed
  }
  
  // Your existing code remains the same, just adding the new method signature
  const AuthContext = createContext<AuthContextType | undefined>(undefined);
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
  
    const login = () => setIsAuthenticated(true);
    const logout = () => {
      setIsAuthenticated(false);
      setUserData(null); // Clear user data on logout
    };
    const addUser = (userData: UserData) => setUserData(userData);
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout, addUser, userData }}>
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
