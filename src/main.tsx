import ReactDOM from 'react-dom/client';
import { OpenAPI } from './api-client';
import App from './App';
import { env, validateEnv } from './config';

import './i18n';

// Validate environment variables
validateEnv();

// Configure API client
OpenAPI.BASE = env.API_BASE_URL;

// Set up authentication token if it exists
const token = localStorage.getItem('access_token');
if (token) {
  OpenAPI.TOKEN = token;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
