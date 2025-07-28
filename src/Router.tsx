import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './entities/auth/context/AuthContext';
import { AuthCallbackPage, LoginPage } from './pages';
import { AdminConferencesPage, AdminGuestsPage, DashboardPage } from './pages/admin';
import { EventPage } from './pages/EventPage';
import { ProtectedRoute } from './shared/ui/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/admin/login',
    element: (
      <AuthProvider>
        <ProtectedRoute requireAuth={false}>
          <LoginPage />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: '/auth/callback',
    element: <AuthCallbackPage />,
  },
  {
    path: '/admin/dashboard',
    index: true,
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: '/admin/guests',
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <AdminGuestsPage />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: '/admin/conferences',
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <AdminConferencesPage />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: '/:customUrl',
    element: <EventPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
