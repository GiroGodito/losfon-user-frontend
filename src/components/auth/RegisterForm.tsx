// // src/components/auth/RegisterForm.tsx
// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { Button } from '../common/Button';
// import { useToast } from '../../hooks/useToast';
// import { RateLimitBanner } from '../common/RateLimitBanner';
// import { TermsModal } from './TermsModal';
// import { PrivacyModal } from './PrivacyModal';
// import { 
//   EnvelopeIcon, 
//   UserIcon, 
//   PhoneIcon, 
//   LockClosedIcon,
//   EyeIcon, 
//   EyeSlashIcon,
//   CheckIcon
// } from '@heroicons/react/24/outline';

// export const RegisterForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     fullName: '',
//     contactNumber: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [acceptedTerms, setAcceptedTerms] = useState(false);
//   const [showTermsModal, setShowTermsModal] = useState(false);
//   const [showPrivacyModal, setShowPrivacyModal] = useState(false);
//   const { register, isRateLimited, rateLimitCountdown, resetRateLimit } = useAuth();
//   const navigate = useNavigate();
//   const { showToast } = useToast();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (isRateLimited) {
//       showToast(`Please wait ${rateLimitCountdown} seconds before trying again.`, 'error');
//       return;
//     }

//     // Frontend validation
//     if (!formData.fullName.trim()) {
//       showToast('Please enter your full name', 'error');
//       return;
//     }
//     if (!formData.email.trim()) {
//       showToast('Please enter your email address', 'error');
//       return;
//     }
//     if (!formData.contactNumber.trim()) {
//       showToast('Please enter your contact number', 'error');
//       return;
//     }
    
//     if (formData.password.length < 8) {
//       showToast('Password must be at least 8 characters long', 'error');
//       return;
//     }
//     if (!/[A-Z]/.test(formData.password)) {
//       showToast('Password must contain at least one uppercase letter', 'error');
//       return;
//     }
//     if (!/[a-z]/.test(formData.password)) {
//       showToast('Password must contain at least one lowercase letter', 'error');
//       return;
//     }
//     if (!/[0-9]/.test(formData.password)) {
//       showToast('Password must contain at least one number', 'error');
//       return;
//     }
//     if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
//       showToast('Password must contain at least one special character', 'error');
//       return;
//     }
    
//     if (formData.password !== formData.confirmPassword) {
//       showToast('Passwords do not match', 'error');
//       return;
//     }

//     if (!acceptedTerms) {
//       showToast('Please accept the Terms of Service and Privacy Policy', 'error');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       await register(formData);
//       showToast('Registration successful! 🎉', 'success');
//       navigate('/dashboard');
//     } catch (error: any) {
//       console.error('❌ Registration error:', error);
//       // Error handled in context
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-gray-900 rounded-2xl shadow-2xl border border-green-500/20 p-8">
//           <div className="w-16 h-1 bg-green-500 rounded-full mx-auto mb-6"></div>
          
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-white">Create Account</h1>
//             <p className="text-gray-400 mt-2">Sign up to start reporting lost items</p>
//           </div>

//           <RateLimitBanner
//             isRateLimited={isRateLimited}
//             countdown={rateLimitCountdown}
//             resourceType="registration"
//             onDismiss={resetRateLimit}
//             className="mb-4"
//           />

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Full Name */}
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <UserIcon className="h-5 w-5 text-green-400" />
//               </div>
//               <input
//                 type="text"
//                 name="fullName"
//                 placeholder="Full Name"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 required
//                 disabled={isRateLimited}
//                 className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
//               />
//             </div>

//             {/* Email */}
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <EnvelopeIcon className="h-5 w-5 text-green-400" />
//               </div>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 disabled={isRateLimited}
//                 className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
//               />
//             </div>

//             {/* Contact Number */}
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <PhoneIcon className="h-5 w-5 text-green-400" />
//               </div>
//               <input
//                 type="tel"
//                 name="contactNumber"
//                 placeholder="Contact Number (e.g., 09123456789)"
//                 value={formData.contactNumber}
//                 onChange={handleChange}
//                 required
//                 disabled={isRateLimited}
//                 className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
//               />
//             </div>

//             {/* Password */}
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <LockClosedIcon className="h-5 w-5 text-green-400" />
//               </div>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 placeholder="Password (min 8 chars with uppercase, lowercase, number, special)"
//                 value={formData.password}
//                 onChange={handleChange}
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

//             {/* Confirm Password */}
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <LockClosedIcon className="h-5 w-5 text-green-400" />
//               </div>
//               <input
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 name="confirmPassword"
//                 placeholder="Confirm Password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 required
//                 disabled={isRateLimited}
//                 className="w-full pl-10 pr-12 py-3 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-green-400 transition-colors"
//               >
//                 {showConfirmPassword ? (
//                   <EyeSlashIcon className="h-5 w-5" />
//                 ) : (
//                   <EyeIcon className="h-5 w-5" />
//                 )}
//               </button>
//             </div>

//             {/* Terms and Privacy Policy Checkbox */}
//             <div className="flex items-start gap-3 pt-2">
//               <button
//                 type="button"
//                 onClick={() => setAcceptedTerms(!acceptedTerms)}
//                 className={`
//                   w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all
//                   ${acceptedTerms 
//                     ? 'bg-green-500 border-green-500 hover:bg-green-400' 
//                     : 'border-gray-600 hover:border-green-500/50'
//                   }
//                 `}
//               >
//                 {acceptedTerms && <CheckIcon className="w-3 h-3 text-white" />}
//               </button>
//               <div className="text-xs text-gray-400 leading-relaxed">
//                 I agree to the{' '}
//                 <button
//                   type="button"
//                   onClick={() => setShowTermsModal(true)}
//                   className="text-green-400 hover:text-green-300 underline underline-offset-2 transition-colors font-medium"
//                 >
//                   Terms of Service
//                 </button>
//                 {' '}and{' '}
//                 <button
//                   type="button"
//                   onClick={() => setShowPrivacyModal(true)}
//                   className="text-green-400 hover:text-green-300 underline underline-offset-2 transition-colors font-medium"
//                 >
//                   Privacy Policy
//                 </button>
//               </div>
//             </div>

//             <Button
//               type="submit"
//               variant="primary"
//               fullWidth
//               isLoading={isLoading}
//               disabled={isRateLimited}
//               className="py-3 text-sm font-semibold"
//             >
//               {isRateLimited ? `Wait ${rateLimitCountdown}s` : 'Create Account'}
//             </Button>

//             <div className="text-center pt-2">
//               <p className="text-sm text-gray-400">
//                 Already have an account?{' '}
//                 <Link 
//                   to="/login" 
//                   className="font-semibold text-green-400 hover:text-green-300 transition-colors"
//                 >
//                   Sign in
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
        
//         <p className="text-center text-xs text-gray-600 mt-6">
//           Secure • Encrypted • Protected
//         </p>
//       </div>

//       {/* Modals */}
//       <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
//       <PrivacyModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
//     </div>
//   );
// };

// export default RegisterForm; LAST WORKING IMIPLEMENTATION
// src/components/auth/RegisterForm.tsx
// src/components/auth/RegisterForm.tsx
// src/components/auth/RegisterForm.tsx
// src/components/auth/RegisterForm.tsx
// src/components/auth/RegisterForm.tsx
// src/components/auth/RegisterForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import { useToast } from '../../hooks/useToast';
import { RateLimitBanner } from '../common/RateLimitBanner';
import { TermsModal } from './TermsModal';
import { PrivacyModal } from './PrivacyModal';
import { 
  EnvelopeIcon, 
  UserIcon, 
  PhoneIcon, 
  LockClosedIcon,
  EyeIcon, 
  EyeSlashIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const { register, isRateLimited, rateLimitCountdown, resetRateLimit } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // ✅ Password validation state with real-time checks
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  
  // ✅ Track focus state
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  // ✅ Real-time password validation
  useEffect(() => {
    const pwd = formData.password;
    setPasswordChecks({
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    });
  }, [formData.password]);

  // ✅ Check if password is valid (all criteria met)
  const isPasswordValid = Object.values(passwordChecks).every(check => check === true);

  // ✅ Check if passwords match
  const doPasswordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password') {
      setPasswordTouched(true);
    }
    if (e.target.name === 'confirmPassword') {
      setConfirmPasswordTouched(true);
    }
  };

  // ✅ Focus handlers
  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };

  const handleConfirmPasswordFocus = () => {
    setConfirmPasswordFocused(true);
  };

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordFocused(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isRateLimited) {
      showToast(`Please wait ${rateLimitCountdown} seconds before trying again.`, 'error');
      return;
    }

    // Frontend validation
    if (!formData.fullName.trim()) {
      showToast('Please enter your full name', 'error');
      return;
    }
    if (!formData.email.trim()) {
      showToast('Please enter your email address', 'error');
      return;
    }
    if (!formData.contactNumber.trim()) {
      showToast('Please enter your contact number', 'error');
      return;
    }
    
    if (!isPasswordValid) {
      showToast('Please meet all password requirements', 'error');
      return;
    }
    
    if (!doPasswordsMatch) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (!acceptedTerms) {
      showToast('Please accept the Terms of Service and Privacy Policy', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await register(formData);
      showToast('Registration successful! 🎉', 'success');
      navigate('/dashboard');
    } catch (error: any) {
      console.error('❌ Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Helper to render password check status
  const renderPasswordCheck = (label: string, met: boolean) => (
    <li className={`flex items-center gap-2 text-xs transition-colors duration-200 ${met ? 'text-green-400' : 'text-gray-500'}`}>
      {met ? (
        <CheckIcon className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
      ) : (
        <XMarkIcon className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
      )}
      <span className={met ? 'text-green-400' : 'text-gray-500'}>{label}</span>
    </li>
  );

  // ✅ Get lock icon color for password field
  const getPasswordLockColor = () => {
    if (!passwordTouched && !passwordFocused) {
      return 'text-green-400';
    }
    if (formData.password.length === 0) {
      return 'text-green-400';
    }
    if (isPasswordValid) {
      return 'text-green-400';
    }
    return 'text-yellow-400';
  };

  // ✅ Get lock icon color for confirm password field
  const getConfirmPasswordLockColor = () => {
    if (!confirmPasswordTouched && !confirmPasswordFocused) {
      return 'text-green-400';
    }
    if (formData.confirmPassword.length === 0) {
      return 'text-green-400';
    }
    if (doPasswordsMatch) {
      return 'text-green-400';
    }
    return 'text-red-400';
  };

  // ✅ Get password border color - FIXED: Uses both border and ring
  const getPasswordBorderClasses = () => {
    // Default: gray border, green ring on focus
    let classes = 'border-gray-700';
    
    // If touched or focused with content
    if ((passwordTouched || passwordFocused) && formData.password.length > 0) {
      if (isPasswordValid) {
        classes = 'border-green-500/50';
      } else {
        classes = 'border-yellow-500/50';
      }
    }
    
    // Focus ring: yellow when invalid, green when valid or empty
    let ringClasses = 'focus:ring-2 focus:ring-green-500';
    if ((passwordTouched || passwordFocused) && formData.password.length > 0 && !isPasswordValid) {
      ringClasses = 'focus:ring-2 focus:ring-yellow-500';
    }
    
    return `${classes} ${ringClasses}`;
  };

  // ✅ Get confirm password border color - FIXED
  const getConfirmPasswordBorderClasses = () => {
    let classes = 'border-gray-700';
    
    if ((confirmPasswordTouched || confirmPasswordFocused) && formData.confirmPassword.length > 0) {
      if (doPasswordsMatch) {
        classes = 'border-green-500/50';
      } else {
        classes = 'border-red-500/50';
      }
    }
    
    let ringClasses = 'focus:ring-2 focus:ring-green-500';
    if ((confirmPasswordTouched || confirmPasswordFocused) && formData.confirmPassword.length > 0 && !doPasswordsMatch) {
      ringClasses = 'focus:ring-2 focus:ring-red-500';
    }
    
    return `${classes} ${ringClasses}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-green-500/20 p-8">
          {/* ✅ GLASS GREEN LOGO */}
          <div className="text-center mb-6">
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
              <span className="text-green-400 font-bold text-2xl group-hover:text-green-300 transition-colors">
                LF
              </span>
            </div>
            <p className="text-gray-400 mt-1">Sign up to start reporting lost items</p>
          </div>

          <RateLimitBanner
            isRateLimited={isRateLimited}
            countdown={rateLimitCountdown}
            resourceType="registration"
            onDismiss={resetRateLimit}
            className="mb-4"
          />

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-green-400" />
              </div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name (Godito, Lito Arthon R.)"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={isRateLimited}
                className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-green-400" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isRateLimited}
                className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
              />
            </div>

            {/* Contact Number */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PhoneIcon className="h-5 w-5 text-green-400" />
              </div>
              <input
                type="tel"
                name="contactNumber"
                placeholder="Contact Number (e.g., 09123456789)"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                disabled={isRateLimited}
                className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
              />
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className={`h-5 w-5 transition-colors duration-200 ${getPasswordLockColor()}`} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={handlePasswordFocus}
                  onBlur={handlePasswordBlur}
                  required
                  disabled={isRateLimited}
                  className={`w-full pl-10 pr-12 py-3 bg-transparent border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-transparent disabled:opacity-50 transition-colors duration-200 ${getPasswordBorderClasses()}`}
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

              {/* ✅ Real-time password requirements */}
              {passwordTouched && formData.password.length > 0 && (
                <div className="mt-2 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50 space-y-1">
                  <p className="text-xs text-gray-400 font-medium mb-1">Password must contain:</p>
                  <ul className="space-y-0.5">
                    {renderPasswordCheck('At least 8 characters', passwordChecks.length)}
                    {renderPasswordCheck('One uppercase letter', passwordChecks.uppercase)}
                    {renderPasswordCheck('One lowercase letter', passwordChecks.lowercase)}
                    {renderPasswordCheck('One number', passwordChecks.number)}
                    {renderPasswordCheck('One special character', passwordChecks.special)}
                  </ul>
                  {isPasswordValid && (
                    <p className="text-xs text-green-400 mt-1.5 flex items-center gap-1">
                      <CheckIcon className="w-3.5 h-3.5" />
                      Strong password! ✓
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className={`h-5 w-5 transition-colors duration-200 ${getConfirmPasswordLockColor()}`} />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={handleConfirmPasswordFocus}
                  onBlur={handleConfirmPasswordBlur}
                  required
                  disabled={isRateLimited}
                  className={`w-full pl-10 pr-12 py-3 bg-transparent border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-transparent disabled:opacity-50 transition-colors duration-200 ${getConfirmPasswordBorderClasses()}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-green-400 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* ✅ Confirm password status */}
              {confirmPasswordTouched && formData.confirmPassword.length > 0 && (
                <div className="mt-1.5">
                  {doPasswordsMatch ? (
                    <p className="text-xs text-green-400 flex items-center gap-1">
                      <CheckIcon className="w-3.5 h-3.5" />
                      Passwords match ✓
                    </p>
                  ) : (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <ExclamationCircleIcon className="w-3.5 h-3.5" />
                      Passwords do not match
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Terms and Privacy Policy Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <button
                type="button"
                onClick={() => setAcceptedTerms(!acceptedTerms)}
                className={`
                  w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all
                  ${acceptedTerms 
                    ? 'bg-green-500 border-green-500 hover:bg-green-400' 
                    : 'border-gray-600 hover:border-green-500/50'
                  }
                `}
              >
                {acceptedTerms && <CheckIcon className="w-3 h-3 text-white" />}
              </button>
              <div className="text-xs text-gray-400 leading-relaxed">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="text-green-400 hover:text-green-300 underline underline-offset-2 transition-colors font-medium"
                >
                  Terms of Service
                </button>
                {' '}and{' '}
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-green-400 hover:text-green-300 underline underline-offset-2 transition-colors font-medium"
                >
                  Privacy Policy
                </button>
              </div>
            </div>

            {/* ✅ GLASS GREEN BUTTON */}
            <Button
              type="submit"
              variant="glass-green"
              fullWidth
              isLoading={isLoading}
              disabled={isRateLimited || !isPasswordValid || !doPasswordsMatch}
              className="py-3 text-sm font-semibold"
            >
              {isRateLimited ? `Wait ${rateLimitCountdown}s` : 'Create Account'}
            </Button>

            <div className="text-center pt-2">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="font-semibold text-green-400 hover:text-green-300 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
          
          <p className="text-center text-xs text-gray-600 mt-6">
            Secure • Encrypted • Protected
          </p>
        </div>
      </div>

      {/* Modals */}
      <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
      <PrivacyModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
    </div>
  );
};

export default RegisterForm;