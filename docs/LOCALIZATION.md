# Localization System Documentation

This project uses **react-i18next** for internationalization, with lazy loading and tree shaking to ensure only needed language files are downloaded by the browser.

## Features

- ✅ **Lazy Loading**: Only needed language files are loaded
- ✅ **Tree Shaking**: Unused translations are not included in the bundle
- ✅ **TypeScript Support**: Type-safe translations with autocompletion
- ✅ **Namespace Organization**: Logical grouping of translations
- ✅ **Automatic Language Detection**: Detects user's preferred language
- ✅ **Local Storage Persistence**: Remembers user's language choice
- ✅ **Hot Reload**: Translations update in development without page refresh

## File Structure

```
src/
├── i18n/
│   ├── index.ts          # Main i18n configuration
│   ├── resources.ts      # Type definitions and resources
│   └── hooks.ts          # Utility hooks for easier usage
├── shared/ui/
│   └── LanguageSwitcher/ # Optional language switcher component
└── ...

public/
└── locales/
    ├── en/               # English translations
    │   ├── common.json   # Common UI elements
    │   ├── auth.json     # Authentication
    │   ├── forms.json    # Form labels & validation
    │   ├── events.json   # Event-specific content
    │   └── navigation.json # Navigation & footer
    └── ru/               # Russian translations (example)
        └── common.json
```

## Namespaces

The translations are organized into logical namespaces:

- **`common`**: Buttons, status messages, common UI elements
- **`auth`**: Authentication forms, error messages
- **`forms`**: Form labels, placeholders, validation messages
- **`events`**: Event-specific content (titles, descriptions)
- **`navigation`**: Navigation links, footer content

## Usage

### Basic Usage

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation('common'); // Use specific namespace

  return <Button>{t('buttons.apply')}</Button>;
}
```

### Cross-Namespace References

```tsx
function MyComponent() {
  const { t } = useTranslation('auth');

  return (
    <div>
      <h1>{t('login.title')}</h1>
      <Button>{t('common:buttons.signIn')}</Button> {/* Cross-namespace */}
    </div>
  );
}
```

### Multiple Namespaces

```tsx
function MyComponent() {
  const { t } = useTranslation(['auth', 'common']);

  return (
    <div>
      <h1>{t('auth:login.title')}</h1>
      <Button>{t('common:buttons.signIn')}</Button>
    </div>
  );
}
```

### Utility Hooks

```tsx
import { useAuthTranslation, useCommonTranslation } from '@/i18n/hooks';

function LoginForm() {
  const authT = useAuthTranslation();
  const commonT = useCommonTranslation();

  return (
    <form>
      <input placeholder={authT.t('placeholders.email')} />
      <button>{commonT.t('buttons.signIn')}</button>
    </form>
  );
}
```

## Adding New Languages

1. **Create language directory**:

   ```bash
   mkdir public/locales/es  # For Spanish
   ```

2. **Copy translation files**:

   ```bash
   cp public/locales/en/*.json public/locales/es/
   ```

3. **Translate the content** in the new JSON files

4. **Update the LanguageSwitcher** (optional):
   ```tsx
   const languages: Language[] = [
     { code: 'en', name: 'English', nativeName: 'English' },
     { code: 'ru', name: 'Russian', nativeName: 'Русский' },
     { code: 'es', name: 'Spanish', nativeName: 'Español' }, // Add this
   ];
   ```

## Translation Keys Format

```json
{
  "buttons": {
    "apply": "Apply",
    "cancel": "Cancel"
  },
  "forms": {
    "labels": {
      "email": "Email Address"
    },
    "validation": {
      "required": "This field is required"
    }
  }
}
```

## Form Validation with Translations

```tsx
import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/form';

function MyForm() {
  const { t } = useTranslation('forms');

  const form = useForm({
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : t('apply.validation.invalidEmail')),
    },
  });

  return (
    <TextInput
      label={t('apply.labels.email')}
      placeholder={t('apply.placeholders.email')}
      {...form.getInputProps('email')}
    />
  );
}
```

## Language Switching

The `LanguageSwitcher` component is automatically included in the Footer. Users can:

1. Click the language button in the footer
2. Select their preferred language
3. The choice is saved in localStorage
4. The page updates immediately without refresh

## Development Tips

### Missing Translation Detection

In development mode, missing translations are:

- Logged to the console
- Automatically saved (if `saveMissing: true`)
- Displayed as the key name

### Adding New Translation Keys

1. Add the key to the appropriate JSON file in `public/locales/en/`
2. Use TypeScript autocompletion to ensure correct key paths
3. Add translations for other languages

### Performance

- Only the current language files are loaded
- Namespaces are loaded on-demand
- Translations are cached in memory
- Language changes don't require page reload

## Bundle Optimization

The system is optimized for production:

```javascript
// ✅ Only loads needed namespace
const { t } = useTranslation('common');

// ✅ Tree-shaken: unused translations removed
// ✅ Lazy-loaded: downloaded when needed
// ✅ Cached: subsequent requests use cache
```

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills)
- Mobile browsers (iOS Safari, Chrome Android)

## Configuration

The i18n system is configured in `src/i18n/index.ts`:

```tsx
i18n.init({
  fallbackLng: 'en',              // Default language
  ns: ['common', 'auth', ...],    // Available namespaces
  defaultNS: 'common',            // Default namespace
  load: 'languageOnly',           // Remove region codes (en-US → en)
  saveMissing: isDevelopment,     // Save missing keys in dev
});
```

## Troubleshooting

### Translation not showing

1. Check if the translation key exists in the JSON file
2. Verify the namespace is correct
3. Ensure the component uses the right namespace
4. Check browser console for missing key warnings

### Language not switching

1. Verify the language files exist in `public/locales/`
2. Check if the language code is correct
3. Clear localStorage if needed: `localStorage.removeItem('i18nextLng')`

### TypeScript errors

1. Ensure `src/i18n/resources.ts` is updated
2. Restart TypeScript server in your IDE
3. Check that translation keys match the JSON structure

## Best Practices

1. **Use semantic keys**: `buttons.submit` not `submitBtn`
2. **Group related translations**: Keep form labels together
3. **Avoid deep nesting**: Max 3 levels deep
4. **Use namespaces**: Separate concerns logically
5. **Keep keys consistent**: Use same patterns across namespaces
6. **Test with longer text**: Some languages need more space
7. **Use plural forms**: For count-based translations
