import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      ...tseslint.configs.recommended,
      prettier
    ],
    files: ['src/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: false
      }
    }
  }
);
