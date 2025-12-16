'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  loginAction,
  signupAction,
  checkAndRefreshAuth,
  clearServerSideTokens,
} from '@/lib/action/auth';

import { userService } from '@/lib/services/userService';
import { authService } from '@/lib/services/authService';

const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
  isAuthChecking: true,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const router = useRouter();
  const getUser = async () => {
    try {
      const userData = await userService.getUser();
      setUser(userData);
    } catch (error) {
      console.error('사용자 정보 로드 실패:', error);
      setUser(null);
    }
  };

  const signup = async (nickname, email, password, confirmPassword) => {
    const { userData, success, error } = await signupAction(
      nickname,
      email,
      password,
      confirmPassword,
    );

    if (!success) {
      throw new Error(error || '회원가입 처리 중 알 수 없는 오류');
    }
    setUser(userData);
    router.push('/');

    return { success: true };
  };
  const login = async (email, password) => {
    const { userData, success, error } = await loginAction(email, password);

    if (!success) {
      throw new Error(error || '로그인 실패');
    }

    setUser(userData);
    router.push('/');

    return { success: true };
  };

  const logout = async () => {
    try {
      await authService.logout();
      await clearServerSideTokens();

      setUser(null);
      router.push('/login');
    } catch (error) {}
  };

  useEffect(() => {
    async function initializeAuth() {
      setIsAuthChecking(true);
      try {
        const isValid = await checkAndRefreshAuth();

        if (isValid) {
          await getUser();
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setIsAuthChecking(false);
      }
    }

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        isAuthChecking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
