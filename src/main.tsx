import ReactDOM from 'react-dom/client';
import { apiClient } from './generated';
import App from './App';
import { env, validateEnv } from './config';

import './i18n';

// Validate environment variables
validateEnv();

// Configure API client
// Note: apiClient is already configured with the correct base URL in generated/index.ts

// Set up authentication token if it exists
const token = localStorage.getItem('access_token');
if (token) {
  apiClient.setToken(token);
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
