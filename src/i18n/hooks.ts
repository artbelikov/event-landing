import { useTranslation } from 'react-i18next';
import type { Namespace } from './resources';

/**
 * Typed hook for translations with namespace support
 */
export function useTypedTranslation<T extends Namespace = 'common'>(namespace?: T) {
  return useTranslation(namespace);
}

/**
 * Shorthand hook for common translations
 */
export function useCommonTranslation() {
  return useTranslation('common');
}

/**
 * Hook for auth-related translations
 */
export function useAuthTranslation() {
  return useTranslation('auth');
}

/**
 * Hook for form-related translations
 */
export function useFormTranslation() {
  return useTranslation('forms');
}

/**
 * Hook for event-related translations
 */
export function useEventTranslation() {
  return useTranslation('events');
}

/**
 * Hook for navigation-related translations
 */
export function useNavigationTranslation() {
  return useTranslation('navigation');
}
