// Centralized environment configuration
export const env = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3005',

  // App Configuration
  APP_TITLE: import.meta.env.VITE_APP_TITLE || 'Event Landing',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === 'true',

  // Authentication
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  JWT_EXPIRY: parseInt(import.meta.env.VITE_JWT_EXPIRY || '3600', 10),

  // Analytics & Tracking
  GOOGLE_ANALYTICS_ID: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || '',
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN || '',

  // Feature Flags
  ENABLE_ADMIN_PANEL: import.meta.env.VITE_ENABLE_ADMIN_PANEL !== 'false',
  MAINTENANCE_MODE: import.meta.env.VITE_MAINTENANCE_MODE === 'true',
  MOCK_API: import.meta.env.VITE_MOCK_API === 'true',
  DISABLE_AUTH: import.meta.env.VITE_DISABLE_AUTH === 'true',

  // Development
  HOT_RELOAD: import.meta.env.VITE_HOT_RELOAD !== 'false',
  DEVELOPER_NAME: import.meta.env.VITE_DEVELOPER_NAME || '',
  ENABLE_DEBUG_TOOLS: import.meta.env.VITE_ENABLE_DEBUG_TOOLS === 'true',

  // Test Environment
  TEST_USER_EMAIL: import.meta.env.VITE_TEST_USER_EMAIL || 'test@example.com',

  // Production
  CDN_URL: import.meta.env.VITE_CDN_URL || '',

  // Environment Detection
  get isDevelopment() {
    return import.meta.env.DEV;
  },

  get isProduction() {
    return import.meta.env.PROD;
  },

  get isTest() {
    return import.meta.env.MODE === 'test';
  },

  get currentMode() {
    return import.meta.env.MODE;
  },
} as const;

// Validation function to check required environment variables
export function validateEnv() {
  const requiredVars = ['VITE_API_BASE_URL'];
  const missingVars = requiredVars.filter((varName) => !import.meta.env[varName]);

  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    if (env.isProduction) {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
  }

  // Log current environment configuration in development
  if (env.isDevelopment && env.DEBUG_MODE) {
    console.log('Environment Configuration:', {
      mode: env.currentMode,
      apiBaseUrl: env.API_BASE_URL,
      debugMode: env.DEBUG_MODE,
      enableAnalytics: env.ENABLE_ANALYTICS,
      maintenanceMode: env.MAINTENANCE_MODE,
    });
  }
}
