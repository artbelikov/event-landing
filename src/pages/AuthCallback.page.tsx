import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Center, Loader, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { apiClient } from '@/generated';
import { authKeys } from '@/entities/auth/model';

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // Store token and configure API client
      localStorage.setItem('access_token', token);
      apiClient.setToken(token);

      // Invalidate auth queries to refetch user data
      queryClient.invalidateQueries({ queryKey: authKeys.all });

      notifications.show({
        title: 'Success',
        message: 'Successfully signed in with Google',
        color: 'green',
      });

      // Redirect to admin dashboard
      navigate('/admin/dashboard');
    } else {
      notifications.show({
        title: 'Error',
        message: 'Authentication failed',
        color: 'red',
      });

      // Redirect to login page
      navigate('/admin/login');
    }
  }, [searchParams, navigate, queryClient]);

  return (
    <Center h="100vh">
      <div style={{ textAlign: 'center' }}>
        <Loader size="lg" mb="md" />
        <Text>Completing authentication...</Text>
      </div>
    </Center>
  );
}
