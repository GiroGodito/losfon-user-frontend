// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { userAuthApi } from '../api/auth';
import type { UserResponse } from '../api/auth';
import { useRateLimiter } from '../hooks/useRateLimiter';
import { useToast } from '../hooks/useToast'; // ✅ ADD THIS

interface AuthContextType {
  user: UserResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  loadProfile: () => Promise<void>;
  clearError: () => void;
  isRateLimited: boolean;
  rateLimitCountdown: number;
  resetRateLimit: () => void;
}

interface RegisterData {
  email: string;
  fullName: string;
  contactNumber: string;
  password: string;
  confirmPassword: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { handleRateLimit, isRateLimited, countdown, resetRateLimit } = useRateLimiter();
  const { showToast } = useToast(); // ✅ ADD THIS

  const loadProfile = useCallback(async () => {
    console.log('🔄 Loading profile...');
    setIsLoading(true);
    setError(null);
    try {
      const userData = await userAuthApi.getProfile();
      console.log('👤 Profile loaded:', userData);
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.log('❌ No profile found, user not authenticated');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    console.log('🔐 Login attempt for:', email);
    setIsLoading(true);
    setError(null);
    try {
      // ✅ Check rate limit before making request
      if (isRateLimited) {
        const msg = `Too many login attempts. Please wait ${countdown} seconds.`;
        setError(msg);
        showToast(msg, 'error'); // ✅ SHOW TOAST
        throw new Error(msg);
      }

      const response = await userAuthApi.login({ email, password });
      console.log('📥 Login response received:', response);
      
      if (response && response.success === true) {
        console.log('✅ Login successful for:', response.user?.email);
        setUser(response.user);
        setIsAuthenticated(true);
        resetRateLimit();
        showToast(`Welcome back, ${response.user?.fullName || 'User'}! 👋`, 'success');
        return;
      }
      
      let errorMsg = 'Invalid email or password';
      if (response?.message) {
        errorMsg = response.message;
      }
      
      console.log('❌ Login failed:', errorMsg);
      setError(errorMsg);
      showToast(errorMsg, 'error'); // ✅ SHOW TOAST
      throw new Error(errorMsg);
      
    } catch (error: any) {
      console.error('❌ Login caught error:', error);
      
      // ✅ Handle rate limit error
      const isRateLimit = handleRateLimit(error, 'login');
      if (isRateLimit) {
        const msg = `Too many login attempts. Please wait ${countdown} seconds.`;
        setError(msg);
        showToast(msg, 'error'); // ✅ SHOW TOAST
        throw new Error(msg);
      }
      
      let errorMsg = 'Invalid email or password';
      
      // ✅ Check for network error FIRST
      if (error?.type === 'NetworkError' || error?.status === 0) {
        errorMsg = '🔌 Cannot connect to server. Please check if backend is running.';
        console.log('🌐 Network error detected:', errorMsg);
      }
      // ✅ Check for validation errors
      else if (error?.status === 400 && error?.message?.includes('validation')) {
        errorMsg = 'Invalid email or password. Please try again.';
      }
      // ✅ Check for unauthorized
      else if (error?.type === 'Unauthorized' || error?.status === 401) {
        errorMsg = 'Invalid email or password. Please try again.';
      }
      // ✅ Check for server error
      else if (error?.status === 500) {
        errorMsg = 'Server error. Please try again later.';
      }
      // ✅ Check for any message that contains validation related text
      else if (error?.message && (
        error.message.toLowerCase().includes('validation') ||
        error.message.toLowerCase().includes('invalid') ||
        error.message.toLowerCase().includes('credentials') ||
        error.message.toLowerCase().includes('email') ||
        error.message.toLowerCase().includes('password')
      )) {
        errorMsg = 'Invalid email or password. Please try again.';
      }
      else if (error?.message) {
        errorMsg = error.message;
      }
      
      console.log('📝 Final error message:', errorMsg);
      setError(errorMsg);
      showToast(errorMsg, 'error'); // ✅ SHOW TOAST
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [handleRateLimit, isRateLimited, countdown, resetRateLimit, showToast]);

  const register = useCallback(async (data: RegisterData) => {
    console.log('📝 Registration attempt for:', data.email);
    setIsLoading(true);
    setError(null);
    try {
      // ✅ Check rate limit before making request
      if (isRateLimited) {
        const msg = `Too many registration attempts. Please wait ${countdown} seconds.`;
        setError(msg);
        showToast(msg, 'error'); // ✅ SHOW TOAST
        throw new Error(msg);
      }

      const response = await userAuthApi.register(data);
      console.log('📥 Registration response received:', response);
      
      if (response && response.success === true) {
        console.log('✅ Registration successful for:', response.user?.email);
        setUser(response.user);
        setIsAuthenticated(true);
        resetRateLimit();
        showToast(`Welcome, ${response.user?.fullName || 'User'}! 🎉`, 'success');
        return;
      }
      
      let errorMsg = 'Registration failed';
      if (response?.message) {
        errorMsg = response.message;
      }
      
      console.log('❌ Registration failed:', errorMsg);
      setError(errorMsg);
      showToast(errorMsg, 'error'); // ✅ SHOW TOAST
      throw new Error(errorMsg);
      
    } catch (error: any) {
      console.error('❌ Registration caught error:', error);
      
      // ✅ Handle rate limit error
      const isRateLimit = handleRateLimit(error, 'registration');
      if (isRateLimit) {
        const msg = `Too many registration attempts. Please wait ${countdown} seconds.`;
        setError(msg);
        showToast(msg, 'error'); // ✅ SHOW TOAST
        throw new Error(msg);
      }
      
      let errorMsg = 'Registration failed';
      
      if (error?.type === 'NetworkError' || error?.status === 0) {
        errorMsg = 'Cannot connect to server. Please check if backend is running.';
        console.log('🌐 Network error detected:', errorMsg);
      } else if (error?.message) {
        errorMsg = error.message;
        console.log('📝 Using error message:', errorMsg);
      }
      
      setError(errorMsg);
      showToast(errorMsg, 'error'); // ✅ SHOW TOAST
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [handleRateLimit, isRateLimited, countdown, resetRateLimit, showToast]);

  // const logout = useCallback(async () => {
  //   console.log('🚪 Logout attempt');
  //   setIsLoading(true);
  //   try {
  //     await userAuthApi.logout();
  //     console.log('✅ Logout successful');
  //     setUser(null);
  //     setIsAuthenticated(false);
  //     setError(null);
  //     showToast('Logged out successfully', 'success');
  //   } catch (error: any) {
  //     console.error('❌ Logout error:', error);
  //     const errorMsg = error.message || 'Logout failed';
  //     setError(errorMsg);
  //     showToast(errorMsg, 'error');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [showToast]);

  // src/context/AuthContext.tsx

const logout = useCallback(async () => {
  console.log('🚪 Logout attempt');
  setIsLoading(true);
  try {
    await userAuthApi.logout();
    console.log('✅ Logout successful');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    // showToast('👋 Logged out successfully', 'success');
  } catch (error: any) {
    console.error('❌ Logout error:', error);
    
    // ✅ ALWAYS clear local state - don't let server errors block logout
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    
    // ✅ Only show error toast for non-network errors
    const isNetworkError = error?.type === 'NetworkError' || error?.status === 0;
    if (!isNetworkError && error?.message) {
      // Check if it's a rate limit or server error
      if (error?.status === 429) {
        showToast('Too many requests. You have been logged out.', 'error');
      } else if (error?.status === 500) {
        showToast('Server issue. You have been logged out.', 'error');
      } else if (error?.message && !error.message.toLowerCase().includes('failed to fetch')) {
        // Only show user-friendly errors, not technical ones
        showToast(error.message, 'error');
      }
    }
    // ✅ SILENTLY handle network errors - no toast
  } finally {
    setIsLoading(false);
  }
}, [showToast]);

  const clearError = useCallback(() => {
    console.log('🧹 Clearing error');
    setError(null);
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    loadProfile,
    clearError,
    isRateLimited,
    rateLimitCountdown: countdown,
    resetRateLimit,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};