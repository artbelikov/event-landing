import type { LoginResponse } from '@/entities/auth';

export interface LoginFormProps {
  onSuccess?: (response: LoginResponse) => void;
  onError?: (error: string) => void;
}

export interface LoginFormData {
  email: string;
  password: string;
}
