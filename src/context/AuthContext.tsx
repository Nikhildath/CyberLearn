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
  apiKeys: string[];
  apiKey: string | null;
  addApiKey: (key: string) => void;
  removeApiKey: (key: string) => void;
  setActiveApiKey: (key: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_USER = 'cyberlearnhq_user_profile';
const LOCAL_STORAGE_KEY_PROGRESS = 'cyberlearnhq_progress';
const LOCAL_STORAGE_KEY_API_KEYS = 'cyberlearnhq_api_keys';
const LOCAL_STORAGE_KEY_ACTIVE_API_KEY = 'cyberlearnhq_active_api_key';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<Record<string, 'completed' | 'failed'>>({});
  const [apiKeys, setApiKeys] = useState<string[]>([]);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY_USER);
      if (storedUser) setUser(JSON.parse(storedUser));
      
      const storedProgress = localStorage.getItem(LOCAL_STORAGE_KEY_PROGRESS);
      if (storedProgress) setProgress(JSON.parse(storedProgress));

      const storedApiKeys = localStorage.getItem(LOCAL_STORAGE_KEY_API_KEYS);
      if (storedApiKeys) setApiKeys(JSON.parse(storedApiKeys));

      const storedActiveKey = localStorage.getItem(LOCAL_STORAGE_KEY_ACTIVE_API_KEY);
      if (storedActiveKey) setApiKey(storedActiveKey);

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

  const addApiKey = (key: string) => {
    setApiKeys(prevKeys => {
      if (prevKeys.includes(key)) return prevKeys;
      const newKeys = [...prevKeys, key];
      localStorage.setItem(LOCAL_STORAGE_KEY_API_KEYS, JSON.stringify(newKeys));
      if (!apiKey) {
        setActiveApiKey(key);
      }
      return newKeys;
    });
  }

  const removeApiKey = (key: string) => {
    setApiKeys(prevKeys => {
      const newKeys = prevKeys.filter(k => k !== key);
      localStorage.setItem(LOCAL_STORAGE_KEY_API_KEYS, JSON.stringify(newKeys));
      if (apiKey === key) {
        const newActiveKey = newKeys[0] || null;
        setActiveApiKey(newActiveKey);
      }
      return newKeys;
    });
  }

  const setActiveApiKey = (key: string | null) => {
    setApiKey(key);
    if (key) {
      localStorage.setItem(LOCAL_STORAGE_KEY_ACTIVE_API_KEY, key);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY_ACTIVE_API_KEY);
    }
  }

  const logout = () => {
    setUser(null);
    setProgress({});
    setApiKeys([]);
    setApiKey(null);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
      localStorage.removeItem(LOCAL_STORAGE_KEY_PROGRESS);
      localStorage.removeItem(LOCAL_STORAGE_KEY_API_KEYS);
      localStorage.removeItem(LOCAL_STORAGE_KEY_ACTIVE_API_KEY);
    } catch (error) {
      console.error('Could not access localStorage', error);
    }
    router.push('/login');
  };

  const value = { 
    user, 
    login, 
    logout, 
    updateProfile, 
    progress, 
    updateLessonProgress,
    apiKeys,
    apiKey,
    addApiKey,
    removeApiKey,
    setActiveApiKey
  };

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
