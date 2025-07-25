/// <reference types="vite/client" />

interface ImportMetaEnv {
  // API Configuration
  readonly VITE_API_BASE_URL: string;

  // App Configuration
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_DEBUG_MODE: string;

  // Authentication
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_JWT_EXPIRY: string;

  // Analytics & Tracking
  readonly VITE_GOOGLE_ANALYTICS_ID: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_SENTRY_DSN: string;

  // Feature Flags
  readonly VITE_ENABLE_ADMIN_PANEL: string;
  readonly VITE_MAINTENANCE_MODE: string;
  readonly VITE_MOCK_API: string;
  readonly VITE_DISABLE_AUTH: string;

  // Development
  readonly VITE_HOT_RELOAD: string;
  readonly VITE_DEVELOPER_NAME: string;
  readonly VITE_ENABLE_DEBUG_TOOLS: string;

  // Test Environment
  readonly VITE_TEST_USER_EMAIL: string;

  // Production
  readonly VITE_CDN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
