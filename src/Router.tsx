import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './entities/auth/context/AuthContext';
import { HomePage, LoginPage } from './pages';
import { AdminConferencesPage, AdminGuestsPage, DashboardPage } from './pages/admin';
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
    path: '/admin/dashboard',
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
    path: '/',
    element: <HomePage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
