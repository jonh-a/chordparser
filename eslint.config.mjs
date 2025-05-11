import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    ignores: ['**/dist/*', '**/examples/*'],
  },
  {
    rules: {
      semi: 'error',
      quotes: ['error', 'single'],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'no-console': 'error',
      'no-unused-vars': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'max-len': ['error', 100],
    },
  },
);