// src/components/auth/PrivacyModal.tsx
import React from 'react';
import { Button } from '../common/Button';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      <div className="relative bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-800 flex-shrink-0">
          <h2 className="text-xl font-bold text-white flex items-center gap-3">
            <span className="text-2xl">🔒</span>
            Privacy Policy
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-4 text-gray-300 text-sm leading-relaxed">
          <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
            <p className="text-green-400 text-xs font-medium">
              Last Updated: July 8, 2026
            </p>
          </div>

          <h3 className="text-white font-semibold text-base mt-6">1. Information We Collect</h3>
          <p>We collect the following types of information to provide and improve our services:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>
              <strong>Personal Information:</strong> Name, email address, contact number that you provide during registration.
            </li>
            <li>
              <strong>Usage Data:</strong> Pages visited, features used, and interactions with the platform to improve user experience.
            </li>
          </ul>

          <h3 className="text-white font-semibold text-base mt-4">2. How We Use Your Information</h3>
          <p>We use your information for the following purposes:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Provide, maintain, and improve the service</li>
            <li>Send notifications about found items and updates</li>
            <li>Analyze usage patterns to optimize the platform</li>
            <li>Ensure security and prevent fraudulent activities</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h3 className="text-white font-semibold text-base mt-4">3. Data Storage and Security</h3>
          <p>Your personal data is stored on secure servers with industry-standard encryption. We implement appropriate technical and organizational measures to protect your data from unauthorized access, alteration, or destruction.</p>

          <h3 className="text-white font-semibold text-base mt-4">4. Data Sharing</h3>
          <p>We do not sell or share your personal information with third parties except in the following cases:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>When required by law or legal process</li>
            <li>To facilitate the lost and found process (your contact information may be shared with the SSO office)</li>
            <li>With your explicit consent</li>
            <li>With service providers who assist in operating our platform (under strict confidentiality agreements)</li>
          </ul>

          <h3 className="text-white font-semibold text-base mt-4">5. Cookies and Tracking Technologies</h3>
          <p>We use cookies and device fingerprinting to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Maintain user sessions and authentication</li>
            <li>Prevent fraud and unauthorized access</li>
            <li>Remember your preferences</li>
          </ul>
          <p className="mt-2">These technologies do not store personal information without your consent.</p>

          <h3 className="text-white font-semibold text-base mt-4">6. Your Rights</h3>
          <p>You have the following rights regarding your personal data:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Access:</strong> Request a copy of your personal data</li>
            <li><strong>Rectification:</strong> Request corrections to inaccurate data</li>
            <li><strong>Restriction:</strong> Restrict processing of your data</li>
            <li><strong>Opt-out:</strong> Unsubscribe from communications</li>
          </ul>

          <h3 className="text-white font-semibold text-base mt-4">7. Data Retention</h3>
          <p>We retain your personal data for as long as your account is active or as needed to provide services. You may request deletion at any time. Some data may be retained for legal compliance or legitimate business purposes.</p>

          <h3 className="text-white font-semibold text-base mt-4">8. Security Measures</h3>
          <p>We use the following security measures to protect your data:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>End-to-end encryption for data transmission</li>
            <li>Secure server infrastructure with firewalls</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Access controls and authentication mechanisms</li>
          </ul>
          <p className="mt-2">However, no method of transmission over the internet is 100% secure.</p>

          <h3 className="text-white font-semibold text-base mt-4">9. Children's Privacy</h3>
          <p>Our service is not intended for children under 13 years of age. We do not knowingly collect or store personal information from children under 13. If we become aware of such data, we will delete it immediately.</p>

          <h3 className="text-white font-semibold text-base mt-4">10. International Data Transfers</h3>
          <p>Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers in compliance with applicable data protection laws.</p>

          <h3 className="text-white font-semibold text-base mt-4">11. Updates to Privacy Policy</h3>
          <p>We may update this privacy policy from time to time. We will notify you of any significant changes via:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Email notification</li>
            <li>In-app notification</li>
            <li>Notice on our website</li>
          </ul>

          <h3 className="text-white font-semibold text-base mt-4">12. Contact Us</h3>
          <p>If you have any questions or concerns about this Privacy Policy, please contact us:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Email: <span className="text-green-400">dmc-sso@dmc.edu.ph</span></li>
          </ul>
        </div>
        
        <div className="p-4 border-t border-gray-800 flex-shrink-0">
          <Button 
            variant="glass-green" 
            fullWidth 
            onClick={onClose}
            className="py-2.5"
          >
            I Understand
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;