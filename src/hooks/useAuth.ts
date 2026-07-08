// src/hooks/useAuth.ts
// Rename the import to prevent the name clash
import { useAuth as useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const auth = useAuthContext(); // Call the renamed context hook
  return auth;
};
