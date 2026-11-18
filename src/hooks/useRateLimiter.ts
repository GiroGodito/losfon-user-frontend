// // src/hooks/useRateLimiter.ts
// import { useState, useCallback, useEffect } from 'react';
// import { useToast } from './useToast';

// interface RateLimiterState {
//   isRateLimited: boolean;
//   retryAfter: number;
//   countdown: number;
//   resourceType?: string;
// }

// export const useRateLimiter = () => {
//   const [state, setState] = useState<RateLimiterState>({
//     isRateLimited: false,
//     retryAfter: 0,
//     countdown: 0,
//   });
//   const { showToast } = useToast();

//   const handleRateLimit = useCallback((error: any, resourceType?: string) => {
//     if (error?.type === 'RateLimitError') {
//       const retrySeconds = error.retryAfter || 30;
//       setState({
//         isRateLimited: true,
//         retryAfter: retrySeconds,
//         countdown: retrySeconds,
//         resourceType,
//       });
      
//       const resourceMessage = resourceType ? ` for ${resourceType}` : '';
//       showToast(`⏳ Too many requests${resourceMessage}. Please wait ${retrySeconds} seconds.`, 'error');
      
//       return true;
//     }
//     return false;
//   }, [showToast]);

//   const resetRateLimit = useCallback(() => {
//     setState({
//       isRateLimited: false,
//       retryAfter: 0,
//       countdown: 0,
//     });
//   }, []);

//   // ✅ Countdown timer
//   useEffect(() => {
//     if (state.countdown <= 0) {
//       if (state.isRateLimited) {
//         setState(prev => ({ ...prev, isRateLimited: false }));
//         showToast('✅ Rate limit lifted. You can try again now.', 'success');
//       }
//       return;
//     }

//     const timer = setInterval(() => {
//       setState(prev => ({
//         ...prev,
//         countdown: Math.max(0, prev.countdown - 1)
//       }));
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [state.countdown, state.isRateLimited, showToast]);

//   return {
//     isRateLimited: state.isRateLimited,
//     retryAfter: state.retryAfter,
//     countdown: state.countdown,
//     resourceType: state.resourceType,
//     handleRateLimit,
//     resetRateLimit,
//   };
// };

// export default useRateLimiter;

// src/hooks/useRateLimiter.ts
import { useState, useCallback, useEffect, useRef } from 'react';
import { useToast } from './useToast';

interface RateLimiterState {
  isRateLimited: boolean;
  retryAfter: number;
  countdown: number;
  resourceType?: string;
}

const STORAGE_PREFIX = 'losfon:rateLimit:';
const UNLOCK_KEY = (resource: string) => `${STORAGE_PREFIX}${resource}:unlockTime`;

function safeGet(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}
function safeSet(key: string, value: string): void {
  try { localStorage.setItem(key, value); } catch { /* ignore */ }
}
function safeRemove(key: string): void {
  try { localStorage.removeItem(key); } catch { /* ignore */ }
}

function computeCountdown(unlockAtMs: number): number {
  const remainingMs = unlockAtMs - Date.now();
  return remainingMs > 0 ? Math.ceil(remainingMs / 1000) : 0;
}

export const useRateLimiter = (resourceKey: string = 'default') => {
  const { showToast } = useToast();
  const toastRef = useRef(showToast);
  toastRef.current = showToast;

  const [state, setState] = useState<RateLimiterState>(() => {
    const unlockAtRaw = safeGet(UNLOCK_KEY(resourceKey));
    if (unlockAtRaw) {
      const unlockAtMs = parseInt(unlockAtRaw, 10);
      const remaining = Number.isFinite(unlockAtMs) ? computeCountdown(unlockAtMs) : 0;
      if (remaining > 0) {
        return {
          isRateLimited: true,
          retryAfter: remaining,
          countdown: remaining,
          resourceType: resourceKey,
        };
      }
      safeRemove(UNLOCK_KEY(resourceKey));
    }
    return { isRateLimited: false, retryAfter: 0, countdown: 0 };
  });

  const handleRateLimit = useCallback((error: any, resourceType?: string) => {
    if (error?.type === 'RateLimitError') {
      const retrySeconds = Math.max(1, Number(error.retryAfter) || 30);
      const unlockAtMs = Date.now() + retrySeconds * 1000;
      safeSet(UNLOCK_KEY(resourceKey), String(unlockAtMs));

      setState({
        isRateLimited: true,
        retryAfter: retrySeconds,
        countdown: retrySeconds,
        resourceType: resourceType ?? resourceKey,
      });

      const label = resourceType ?? resourceKey;
      toastRef.current(`⏳ Too many requests for ${label}. Please wait ${retrySeconds} seconds.`, 'error');
      return true;
    }
    return false;
  }, [resourceKey]);

  const resetRateLimit = useCallback(() => {
    safeRemove(UNLOCK_KEY(resourceKey));
    setState({ isRateLimited: false, retryAfter: 0, countdown: 0 });
  }, [resourceKey]);

  useEffect(() => {
    if (!state.isRateLimited) return;

    const tick = () => {
      const unlockAtRaw = safeGet(UNLOCK_KEY(resourceKey));
      const unlockAtMs = unlockAtRaw ? parseInt(unlockAtRaw, 10) : 0;
      const remaining = Number.isFinite(unlockAtMs) ? computeCountdown(unlockAtMs) : 0;

      if (remaining <= 0) {
        safeRemove(UNLOCK_KEY(resourceKey));
        setState({ isRateLimited: false, retryAfter: 0, countdown: 0 });
        toastRef.current('✅ Rate limit lifted. You can try again now.', 'success');
      } else {
        setState(prev => (prev.countdown === remaining ? prev : { ...prev, countdown: remaining }));
      }
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [state.isRateLimited, resourceKey]);

  return {
    isRateLimited: state.isRateLimited,
    retryAfter: state.retryAfter,
    countdown: state.countdown,
    resourceType: state.resourceType,
    handleRateLimit,
    resetRateLimit,
  };
};

export default useRateLimiter;