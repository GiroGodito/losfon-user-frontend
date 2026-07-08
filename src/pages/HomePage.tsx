// src/pages/HomePage.tsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';

export const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="text-center max-w-2xl">
        {/* Logo/Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-2xl mb-6 border border-green-500/20">
          <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
          </svg>
        </div>
        
        <h1 className="text-5xl font-bold text-white mb-4">
          LosFon Public
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Report lost items and get notified when they're found.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="primary" size="lg" className="px-8">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="primary" size="lg" className="px-8">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg" className="px-8">
                  Create Account
                </Button>
              </Link>
            </>
          )}
        </div>
        
        {/* Feature badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Secure
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Encrypted
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Protected
          </span>
        </div>
      </div>
    </div>
  );
};