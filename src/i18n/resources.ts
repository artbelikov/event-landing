import auth from '../../public/locales/en/auth.json';
import common from '../../public/locales/en/common.json';
import events from '../../public/locales/en/events.json';
import forms from '../../public/locales/en/forms.json';
import navigation from '../../public/locales/en/navigation.json';

export const defaultNS = 'common';

export const resources = {
  en: {
    common,
    auth,
    forms,
    events,
    navigation,
  },
} as const;

export type Resources = typeof resources;
export type Language = keyof Resources;
export type Namespace = keyof Resources[Language];

// Declare global types for react-i18next
declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: Resources['en'];
  }
}
