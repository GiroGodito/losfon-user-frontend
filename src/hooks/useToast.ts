// src/hooks/useToast.ts
import { useCallback } from 'react';
import toast from 'react-hot-toast';

export const useToast = () => {
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'loading' = 'success') => {
    if (type === 'success') {
      toast.success(message);
    } else if (type === 'error') {
      toast.error(message);
    } else if (type === 'loading') {
      toast.loading(message);
    } else {
      toast(message);
    }
  }, []);

  const dismissToast = useCallback((toastId: string) => {
    toast.dismiss(toastId);
  }, []);

  return { showToast, dismissToast };
};