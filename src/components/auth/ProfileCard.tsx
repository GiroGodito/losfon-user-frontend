// src/components/auth/ProfileCard.tsx
import React, { useState } from 'react';
import type { UserResponse } from '../../api/auth';
import { userAuthApi } from '../../api/auth';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../hooks/useToast';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  CalendarIcon, 
  ArrowRightOnRectangleIcon,
  KeyIcon,
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

interface ProfileCardProps {
  user: UserResponse;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const { logout } = useAuth();
  const { showToast } = useToast();
  
  // Password change state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      showToast('Logged out successfully', 'success');
    } catch (error: any) {
      showToast(error.message || 'Logout failed', 'error');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!currentPassword.trim()) {
      showToast('Please enter your current password', 'error');
      return;
    }
    
    if (newPassword.length < 8) {
      showToast('New password must be at least 8 characters long', 'error');
      return;
    }
    
    if (!/[A-Z]/.test(newPassword)) {
      showToast('New password must contain at least one uppercase letter', 'error');
      return;
    }
    
    if (!/[a-z]/.test(newPassword)) {
      showToast('New password must contain at least one lowercase letter', 'error');
      return;
    }
    
    if (!/[0-9]/.test(newPassword)) {
      showToast('New password must contain at least one number', 'error');
      return;
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      showToast('New password must contain at least one special character', 'error');
      return;
    }
    
    if (newPassword !== confirmNewPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const response = await userAuthApi.changePassword({
        currentPassword,
        newPassword,
        confirmNewPassword,
      });
      
      if (response.success) {
        showToast('Password changed successfully! 🔒', 'success');
        // Reset form
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setIsPasswordModalOpen(false);
      } else {
        showToast(response.message || 'Failed to change password', 'error');
      }
    } catch (error: any) {
      console.error('❌ Password change error:', error);
      
      let errorMessage = 'Failed to change password';
      if (error?.message) {
        errorMessage = error.message;
      }
      // Check for specific error
      if (errorMessage.toLowerCase().includes('current password')) {
        errorMessage = 'Current password is incorrect. Please try again.';
      } else if (errorMessage.toLowerCase().includes('same')) {
        errorMessage = 'New password must be different from current password.';
      }
      
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full flex items-center justify-center border-2 border-green-500/30">
                <span className="text-3xl font-bold text-green-400">
                  {user.fullName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-semibold text-white">{user.fullName}</h2>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-3 text-sm">
                <div className="flex items-center gap-2 text-gray-400 justify-center md:justify-start">
                  <EnvelopeIcon className="w-4 h-4 text-green-400" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 justify-center md:justify-start">
                  <PhoneIcon className="w-4 h-4 text-green-400" />
                  <span>{user.contactNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 justify-center md:justify-start">
                  <CalendarIcon className="w-4 h-4 text-green-400" />
                  <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
              <Button 
                variant="glass-yellow" 
                onClick={() => setIsPasswordModalOpen(true)}
                className="flex items-center gap-2"
              >
                <KeyIcon className="w-4 h-4" />
                Change Password
              </Button>
              <Button 
                variant="glass-red" 
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Password Change Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsPasswordModalOpen(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <KeyIcon className="w-5 h-5 text-yellow-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Change Password</h2>
              </div>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter current password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {showCurrentPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {showNewPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="text-xs text-gray-500 space-y-1 bg-gray-800/30 rounded-lg p-3">
                <p className="text-gray-400 font-medium mb-1">Password must contain:</p>
                <ul className="list-disc list-inside pl-2 space-y-0.5">
                  <li className={newPassword.length >= 8 ? 'text-green-400' : 'text-gray-500'}>
                    At least 8 characters
                  </li>
                  <li className={/[A-Z]/.test(newPassword) ? 'text-green-400' : 'text-gray-500'}>
                    One uppercase letter
                  </li>
                  <li className={/[a-z]/.test(newPassword) ? 'text-green-400' : 'text-gray-500'}>
                    One lowercase letter
                  </li>
                  <li className={/[0-9]/.test(newPassword) ? 'text-green-400' : 'text-gray-500'}>
                    One number
                  </li>
                  <li className={/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? 'text-green-400' : 'text-gray-500'}>
                    One special character
                  </li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="glass-grey"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="glass-yellow"
                  isLoading={isLoading}
                  className="flex-1"
                >
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCard;