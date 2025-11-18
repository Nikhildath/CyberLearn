'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export interface UserProfile {
  username: string;
  avatar?: string; // a base64 string for the image
}

interface AuthContextType {
  user: UserProfile | null;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  progress: Record<string, 'completed' | 'failed'>;
  updateLessonProgress: (lessonId: string, status: 'completed' | 'failed') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_USER = 'cyberlearnhq_user_profile';
const LOCAL_STORAGE_KEY_PROGRESS = 'cyberlearnhq_progress';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<Record<string, 'completed' | 'failed'>>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      const storedProgress = localStorage.getItem(LOCAL_STORAGE_KEY_PROGRESS);
      if (storedProgress) {
        setProgress(JSON.parse(storedProgress));
      }
    } catch (error) {
      console.error('Could not access localStorage', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (username: string, pass: string): boolean => {
    if (username === 'nikhil' && pass === 'nikhil') {
      const newUserProfile: UserProfile = { username };
      setUser(newUserProfile);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(newUserProfile));
      } catch (error) {
        console.error('Could not access localStorage', error);
      }
      return true;
    }
    return false;
  };
  
  const updateProfile = (profileUpdate: Partial<UserProfile>) => {
    setUser(prevUser => {
        if (!prevUser) return null;
        const updatedUser = { ...prevUser, ...profileUpdate };
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(updatedUser));
        } catch (error) {
            console.error("Could not save profile to localStorage", error);
        }
        return updatedUser;
    });
  };

  const updateLessonProgress = (lessonId: string, status: 'completed' | 'failed') => {
    setProgress(prevProgress => {
      const newProgress = { ...prevProgress, [lessonId]: status };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY_PROGRESS, JSON.stringify(newProgress));
      } catch (error) {
        console.error("Could not save progress to localStorage", error);
      }
      return newProgress;
    });
  };


  const logout = () => {
    setUser(null);
    setProgress({});
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
      localStorage.removeItem(LOCAL_STORAGE_KEY_PROGRESS);
    } catch (error) {
      console.error('Could not access localStorage', error);
    }
    router.push('/login');
  };

  const value = { user, login, logout, updateProfile, progress, updateLessonProgress };

  if (loading) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
    );
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
