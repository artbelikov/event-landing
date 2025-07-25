import type { LoginDto, RegisterDto, User } from '@/api-client';

export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  currentUser: () => [...authKeys.user(), 'current'] as const,
} as const;

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
