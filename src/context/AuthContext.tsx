'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: string | null;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('cyberlearnhq_user');
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error('Could not access localStorage', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (username: string, pass: string): boolean => {
    if (username === 'nikhil' && pass === 'nikhil') {
      setUser(username);
      try {
        localStorage.setItem('cyberlearnhq_user', username);
      } catch (error) {
        console.error('Could not access localStorage', error);
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('cyberlearnhq_user');
    } catch (error) {
      console.error('Could not access localStorage', error);
    }
    router.push('/login');
  };

  const value = { user, login, logout };

  if (loading) {
    return null; // Or a loading spinner
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
