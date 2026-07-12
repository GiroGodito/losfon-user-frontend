// // src/components/auth/LoginForm.tsx
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { Button } from '../common/Button';
// import { useToast } from '../../hooks/useToast';
// import { RateLimitBanner } from '../common/RateLimitBanner';
// import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

// export const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const { login, isRateLimited, rateLimitCountdown, resetRateLimit } = useAuth();
//   const navigate = useNavigate();
//   const { showToast } = useToast();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     console.log('🔐 Login form submitted for:', email);
    
//     if (isRateLimited) {
//       showToast(`Please wait ${rateLimitCountdown} seconds before trying again.`, 'error');
//       return;
//     }
    
//     if (!email.trim()) {
//       console.log('⚠️ Email is empty');
//       showToast('Please enter your email address', 'error');
//       return;
//     }
//     if (!password.trim()) {
//       console.log('⚠️ Password is empty');
//       showToast('Please enter your password', 'error');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await login(email, password);
//       console.log('✅ Login successful, navigating to dashboard');
//       showToast('Welcome back! 👋', 'success');
//       navigate('/dashboard');
//     } catch (error: any) {
//       console.error('❌ Login error in form:', error);
//       // Error already handled in context
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-gray-900 rounded-2xl shadow-2xl border border-green-500/20 p-8">
//           <div className="text-center mb-5">
//             <h1 className="text-3xl font-bold text-white">LosFon Public</h1>
//             <p className="text-gray-400 mt-1">Sign in to your account</p>
//           </div>

//           <RateLimitBanner
//             isRateLimited={isRateLimited}
//             countdown={rateLimitCountdown}
//             resourceType="login"
//             onDismiss={resetRateLimit}
//             className="mb-4"
//           />

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <EnvelopeIcon className="h-5 w-5 text-green-400" />
//               </div>
//               <input
//                 type="email"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 disabled={isRateLimited}
//                 className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
//               />
//             </div>

//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <LockClosedIcon className="h-5 w-5 text-green-400" />
//               </div>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 disabled={isRateLimited}
//                 className="w-full pl-10 pr-12 py-3 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-green-400 transition-colors"
//               >
//                 {showPassword ? (
//                   <EyeSlashIcon className="h-5 w-5" />
//                 ) : (
//                   <EyeIcon className="h-5 w-5" />
//                 )}
//               </button>
//             </div>

//             <Button
//               type="submit"
//               variant="primary"
//               fullWidth
//               isLoading={isLoading}
//               disabled={isRateLimited}
//               className="py-3 text-sm font-semibold"
//             >
//               {isRateLimited ? `Wait ${rateLimitCountdown}s` : 'Sign In'}
//             </Button>

//             <div className="text-center pt-2">
//               <p className="text-sm text-gray-400">
//                 Don't have an account?{' '}
//                 <Link 
//                   to="/register" 
//                   className="font-semibold text-green-400 hover:text-green-300 transition-colors"
//                 >
//                   Sign up
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
        
//         <p className="text-center text-xs text-gray-600 mt-6">
//           Secure • Encrypted • Protected
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginForm; LAST WORKING IMPLEMENTATION
// src/components/auth/LoginForm.tsx
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { Button } from '../common/Button';
// import { useToast } from '../../hooks/useToast';
// import { RateLimitBanner } from '../common/RateLimitBanner';
// import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

// export const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const { login, isRateLimited, rateLimitCountdown, resetRateLimit } = useAuth();
//   const navigate = useNavigate();
//   const { showToast } = useToast();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     console.log('🔐 Login form submitted for:', email);
    
//     if (isRateLimited) {
//       showToast(`Please wait ${rateLimitCountdown} seconds before trying again.`, 'error');
//       return;
//     }
    
//     if (!email.trim()) {
//       console.log('⚠️ Email is empty');
//       showToast('Please enter your email address', 'error');
//       return;
//     }
//     if (!password.trim()) {
//       console.log('⚠️ Password is empty');
//       showToast('Please enter your password', 'error');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await login(email, password);
//       console.log('✅ Login successful, navigating to dashboard');
//       showToast('Welcome back! 👋', 'success');
//       navigate('/dashboard');
//     } catch (error: any) {
//       console.error('❌ Login error in form:', error);
//       // Error already handled in context
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-gray-900 rounded-2xl shadow-2xl border border-green-500/20 p-8">
//           <div className="text-center mb-5">
//             {/* ✅ GLASS GREEN LOGO - Same as admin */}
//             <div className="
//               w-16 h-16 
//               bg-green-500/10 backdrop-blur-sm 
//               border border-green-500/20 
//               rounded-2xl 
//               flex items-center justify-center 
//               mx-auto
//               shadow-sm
//               shadow-green-500/5
//               transition-all duration-300
//               hover:bg-green-500/20
//               hover:border-green-500/30
//               hover:shadow-green-500/20
//               hover:scale-[1.02]
//               mb-4
//             ">
//               <span className="text-green-400 font-bold text-2xl group-hover:text-green-300 transition-colors">
//                 LF
//               </span>
//             </div>
//             <p className="text-gray-400 mt-1">Sign in to your account</p>
//           </div>

//           <RateLimitBanner
//             isRateLimited={isRateLimited}
//             countdown={rateLimitCountdown}
//             resourceType="login"
//             onDismiss={resetRateLimit}
//             className="mb-4"
//           />

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <EnvelopeIcon className="h-5 w-5 text-green-400" />
//               </div>
//               <input
//                 type="email"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 disabled={isRateLimited}
//                 className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
//               />
//             </div>

//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <LockClosedIcon className="h-5 w-5 text-green-400" />
//               </div>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 disabled={isRateLimited}
//                 className="w-full pl-10 pr-12 py-3 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-green-400 transition-colors"
//               >
//                 {showPassword ? (
//                   <EyeSlashIcon className="h-5 w-5" />
//                 ) : (
//                   <EyeIcon className="h-5 w-5" />
//                 )}
//               </button>
//             </div>

//             {/* ✅ GLASS GREEN BUTTON - Same as admin */}
//             <Button
//               type="submit"
//               variant="glass-green"
//               fullWidth
//               isLoading={isLoading}
//               disabled={isRateLimited}
//               className="py-3 text-sm font-semibold"
//             >
//               {isRateLimited ? `Wait ${rateLimitCountdown}s` : 'Sign In'}
//             </Button>

//             <div className="text-center pt-2">
//               <p className="text-sm text-gray-400">
//                 Don't have an account?{' '}
//                 <Link 
//                   to="/register" 
//                   className="font-semibold text-green-400 hover:text-green-300 transition-colors"
//                 >
//                   Sign up
//                 </Link>
//               </p>
//             </div>
//           </form>
          
//           <p className="text-center text-xs text-gray-600 mt-6">
//             Secure • Encrypted • Protected
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
// src/components/auth/LoginForm.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import { useToast } from '../../hooks/useToast';
import { RateLimitBanner } from '../common/RateLimitBanner';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-800 p-8">
          {/* Back to Home - Top Left
          <div className="flex justify-start mb-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-all duration-200 group"
            >
              <HomeIcon className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Return to Homepage</span>
            </Link>
          </div> */}

          <div className="text-center mb-6">
            {/* ✅ GLASS GREEN LOGO */}
            <div className="
              w-16 h-16 
              bg-green-500/10 backdrop-blur-sm 
              border border-green-500/20 
              rounded-2xl 
              flex items-center justify-center 
              mx-auto
              shadow-sm
              shadow-green-500/5
              transition-all duration-300
              hover:bg-green-500/20
              hover:border-green-500/30
              hover:shadow-green-500/20
              hover:scale-[1.02]
              mb-4
            ">
              <span className="text-green-400 font-bold text-2xl transition-colors">
                LF
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-1">Sign in to continue to your account</p>
          </div>

          <RateLimitBanner
            isRateLimited={isRateLimited}
            countdown={rateLimitCountdown}
            resourceType="login"
            onDismiss={resetRateLimit}
            className="mb-4"
          />

          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full pl-10 pr-4 py-3 bg-gray-800/30 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-200 disabled:opacity-50"
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
                className="w-full pl-10 pr-12 py-3 bg-gray-800/30 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-200 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-green-400 transition-colors"
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
              variant="glass-green"
              fullWidth
              isLoading={isLoading}
              disabled={isRateLimited}
              className="py-3.5 text-sm font-semibold rounded-xl"
            >
              {isRateLimited ? `Wait ${rateLimitCountdown}s` : 'Sign In'}
            </Button>

            {/* ✅ Professional footer with divider */}
            <div className="relative pt-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700/50"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-gray-900/50 text-gray-500">or</span>
              </div>
            </div>

            <div className="text-center space-y-2 pt-1">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="font-medium text-green-400 hover:text-green-300 transition-colors hover:underline underline-offset-2"
                >
                  Create one now
                </Link>
              </p>
              <p className="text-xs text-gray-500">
                <Link 
                  to="/" 
                  className="hover:text-gray-300 transition-colors inline-flex items-center gap-1.5 group mt-5"
                >
                  <HomeIcon className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:underline underline-offset-2">Return to Homepage</span>
                </Link>
              </p>
            </div>
          </form>
          
          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 bg-green-400 rounded-full"></span>
              Secure
            </span>
            <span className="w-px h-3 bg-gray-700"></span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 bg-green-400 rounded-full"></span>
              Encrypted
            </span>
            <span className="w-px h-3 bg-gray-700"></span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 bg-green-400 rounded-full"></span>
              Protected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;