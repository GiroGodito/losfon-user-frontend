// src/components/auth/TermsModal.tsx
import React from 'react';
import { Button } from '../common/Button';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
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
            <span className="text-2xl">📜</span>
            Terms of Service
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

          <h3 className="text-white font-semibold text-base mt-6">1. Acceptance of Terms</h3>
          <p>By creating an account and using the LosFon Public service, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>

          <h3 className="text-white font-semibold text-base mt-4">2. Description of Service</h3>
          <p>LosFon Public is a lost and found item reporting system that allows users to report lost items, track their reports, and receive notifications when items are found.</p>

          <h3 className="text-white font-semibold text-base mt-4">3. User Accounts</h3>
          <p>You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate and complete information during registration and to update it as necessary.</p>

          <h3 className="text-white font-semibold text-base mt-4">4. User Conduct</h3>
          <p>You agree to use the service only for lawful purposes. You shall not:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Provide false or misleading information</li>
            <li>Impersonate any person or entity</li>
            <li>Attempt to gain unauthorized access to the system</li>
            <li>Interfere with or disrupt the service</li>
            <li>Use the service for any illegal or unauthorized purpose</li>
          </ul>

          <h3 className="text-white font-semibold text-base mt-4">5. Intellectual Property</h3>
          <p>All content and materials available on the LosFon Public service are the property of LosFon and are protected by applicable copyright and trademark laws.</p>

          <h3 className="text-white font-semibold text-base mt-4">6. Termination</h3>
          <p>We reserve the right to suspend or terminate your account at any time for violation of these terms or for any other reason without prior notice.</p>

          <h3 className="text-white font-semibold text-base mt-4">7. Disclaimer of Warranties</h3>
          <p>The service is provided "as is" without warranties of any kind. We do not guarantee the accuracy or completeness of any information on the platform.</p>

          <h3 className="text-white font-semibold text-base mt-4">8. Limitation of Liability</h3>
          <p>LosFon shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the service.</p>

          <h3 className="text-white font-semibold text-base mt-4">9. Changes to Terms</h3>
          <p>We reserve the right to update these terms at any time. Continued use of the service constitutes acceptance of the updated terms.</p>

          <h3 className="text-white font-semibold text-base mt-4">10. Contact Information</h3>
          <p>For questions about these terms, please contact us at <span className="text-green-400">support@losfon.com</span>.</p>
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

export default TermsModal;