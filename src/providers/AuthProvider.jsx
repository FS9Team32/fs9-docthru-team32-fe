'use client';

import { createContext, useContext, useState } from 'react';
import { MOCK_USER, MOCK_ADMIN } from '@/constants/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(MOCK_USER);

  const login = (userData) => {
    setUser(userData ?? MOCK_USER);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
