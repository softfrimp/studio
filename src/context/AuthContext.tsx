'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { SignUpData, LoginData } from '@/lib/types';

// This is a dummy user object for simulation
interface DummyUser {
  uid: string;
  email: string;
  lastPeriodDate?: string;
  cycleLength?: number;
  periodDuration?: number;
}

interface AuthContextType {
  user: DummyUser | null;
  loading: boolean;
  signup: (data: SignUpData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  updateInitialPeriod: (date: Date, length: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to get/set data from localStorage
const getStoredUser = (): DummyUser | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('dummyUser');
  return stored ? JSON.parse(stored) : null;
};

const setStoredUser = (user: DummyUser | null) => {
    if (typeof window === 'undefined') return;
    if (user) {
        localStorage.setItem('dummyUser', JSON.stringify(user));
    } else {
        localStorage.removeItem('dummyUser');
    }
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<DummyUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On initial load, check for a user in localStorage
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const signup = async (data: SignUpData): Promise<void> => {
    setLoading(true);
    // Simulate a network request
    await new Promise(res => setTimeout(res, 500));
    
    // In a real app, you'd send this to your backend to create a user.
    // Here, we just create a dummy user object.
    const newUser: DummyUser = {
      uid: `user_${Math.random().toString(36).substr(2, 9)}`,
      email: data.email,
      lastPeriodDate: data.lastPeriodDate,
      cycleLength: data.cycleLength,
      periodDuration: data.periodDuration,
    };
    
    setUser(newUser);
    setStoredUser(newUser);
    setLoading(false);
  };

  const login = async (data: LoginData): Promise<void> => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 500));

    // Dummy login logic: if the user exists, log them in.
    // For this dummy implementation, we'll just create a user if one doesn't exist
    // or log in with a generic user. A real app would check credentials.
    const existingUser = getStoredUser();
    if (existingUser && existingUser.email === data.email) {
        setUser(existingUser);
    } else {
        // Create a new dummy user for demonstration if email doesn't match
        const newUser: DummyUser = {
            uid: `user_${Math.random().toString(36).substr(2, 9)}`,
            email: data.email,
        };
        setUser(newUser);
        setStoredUser(newUser);
    }
    setLoading(false);
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 500));
    setUser(null);
    setStoredUser(null);
    setLoading(false);
  };
  
  const updateInitialPeriod = (date: Date, length: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        lastPeriodDate: date.toISOString().split('T')[0],
        cycleLength: length
      };
      setUser(updatedUser);
      setStoredUser(updatedUser);
    }
  };


  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    updateInitialPeriod
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};