import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const isDevelopment = import.meta.env.DEV;

i18n
  // Load translation using http backend
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    fallbackLng: 'en',
    debug: isDevelopment,

    // We have a common namespace used around the full app
    ns: ['common', 'auth', 'forms', 'events', 'navigation'],
    defaultNS: 'common',

    // Resources can be loaded from the backend
    backend: {
      // Load from public/locales directory
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // Language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // React already does escaping
    },

    // Only load namespaces that are needed
    load: 'languageOnly', // Remove region code if found
    cleanCode: true, // Clean up language codes like en-US -> en

    // Optimize loading
    saveMissing: isDevelopment, // Save missing translations in development
    updateMissing: isDevelopment,

    react: {
      useSuspense: false, // Disable suspense for SSR compatibility
    },
  });

export default i18n;
