import type { User } from '@/generated';

export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  currentUser: () => [...authKeys.user(), 'current'] as const,
} as const;

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  role?: string;
}

export type LoginParams = LoginDto;
export type RegisterParams = RegisterDto;

export type LoginResponse = {
  access_token: string;
  user: User;
};

export type AuthUser = User | null;

export interface AuthState {
  user: AuthUser;
  isAuthenticated: boolean;
  isLoading: boolean;
}
