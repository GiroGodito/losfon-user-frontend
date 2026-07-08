// src/components/auth/LoginForm.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import { useToast } from '../../hooks/useToast';
import { RateLimitBanner } from '../common/RateLimitBanner';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isRateLimited, rateLimitCountdown, resetRateLimit } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🔐 Login form submitted for:', email);
    
    if (isRateLimited) {
      showToast(`Please wait ${rateLimitCountdown} seconds before trying again.`, 'error');
      return;
    }
    
    if (!email.trim()) {
      console.log('⚠️ Email is empty');
      showToast('Please enter your email address', 'error');
      return;
    }
    if (!password.trim()) {
      console.log('⚠️ Password is empty');
      showToast('Please enter your password', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      console.log('✅ Login successful, navigating to dashboard');
      showToast('Welcome back! 👋', 'success');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('❌ Login error in form:', error);
      // Error already handled in context
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-green-500/20 p-8">
          <div className="text-center mb-5">
            <h1 className="text-3xl font-bold text-white">LosFon Public</h1>
            <p className="text-gray-400 mt-1">Sign in to your account</p>
          </div>

          <RateLimitBanner
            isRateLimited={isRateLimited}
            countdown={rateLimitCountdown}
            resourceType="login"
            onDismiss={resetRateLimit}
            className="mb-4"
          />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-green-400" />
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isRateLimited}
                className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-green-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isRateLimited}
                className="w-full pl-10 pr-12 py-3 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-green-400 transition-colors"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              disabled={isRateLimited}
              className="py-3 text-sm font-semibold"
            >
              {isRateLimited ? `Wait ${rateLimitCountdown}s` : 'Sign In'}
            </Button>

            <div className="text-center pt-2">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="font-semibold text-green-400 hover:text-green-300 transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
        
        <p className="text-center text-xs text-gray-600 mt-6">
          Secure • Encrypted • Protected
        </p>
      </div>
    </div>
  );
};

export default LoginForm;