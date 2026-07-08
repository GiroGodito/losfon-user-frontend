// src/api/auth.ts
import { api } from './client';

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserRegisterRequest {
  email: string;
  fullName: string;
  contactNumber: string;
  password: string;
  confirmPassword: string;
}

export interface UserResponse {
  id: number;
  email: string;
  fullName: string;
  contactNumber: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  user: UserResponse;
  message?: string;
}

// ✅ ADD THIS
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const userAuthApi = {
  register: (data: UserRegisterRequest): Promise<AuthResponse> =>
    api.post<AuthResponse>('/user/UserAuth/register', data),

  login: (data: UserLoginRequest): Promise<AuthResponse> =>
    api.post<AuthResponse>('/user/UserAuth/login', data),

  logout: (): Promise<{ success: boolean; message: string }> =>
    api.post<{ success: boolean; message: string }>('/user/UserAuth/logout'),

  getProfile: (): Promise<UserResponse> =>
    api.get<UserResponse>('/user/UserAuth/profile'),

  // ✅ ADD THIS
  changePassword: (data: ChangePasswordRequest): Promise<{ success: boolean; message: string }> =>
    api.post<{ success: boolean; message: string }>('/user/UserAuth/change-password', data),
};