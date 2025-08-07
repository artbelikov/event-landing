import mantine from 'eslint-config-mantine';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...mantine,
  { ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}', './.storybook/main.ts', './src/api-client'] },
  {
    files: ['**/*.story.tsx'],
    rules: { 'no-console': 'off' },
  },
  {
    rules: {
      // Unused imports and variables rules
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }],
      'no-unused-vars': 'off', // Turn off base rule as it conflicts with TypeScript rule
      // Import rules
      '@typescript-eslint/no-unused-expressions': 'error',
      // Auto-fixable rules
      'prefer-const': 'error',
      '@typescript-eslint/no-var-requires': 'error',
      // React specific rules
      'react/jsx-no-useless-fragment': 'error',
      'react/no-unused-state': 'error',
    },
  }
);
