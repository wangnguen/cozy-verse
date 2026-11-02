import js from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/**
 * Layer rules. Imports may only point down this chain:
 *   app -> workspace -> features -> components / shared / config
 * - components, shared, config know nothing about features, workspace or app.
 * - A feature never imports another feature; cross-feature flows live in workspace/flows.
 * - Outside a feature, import it only through its public API: '@/features/<name>'.
 */
const restrict = (patterns) => ({
  'no-restricted-imports': ['error', { patterns }],
});

const eslintConfig = defineConfig([
  globalIgnores(['dist/**', 'coverage/**']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: { globals: globals.browser },
  },
  {
    // shadcn/ui style: a component file also exports its cva variants (e.g. buttonVariants)
    files: ['src/components/ui/**'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
  {
    files: ['src/components/**', 'src/shared/**', 'src/config/**'],
    rules: restrict([
      {
        group: ['@/app/*', '@/workspace', '@/workspace/*', '@/features', '@/features/*'],
        message: 'components, shared and config must not import app, workspace or features.',
      },
    ]),
  },
  {
    files: ['src/features/**'],
    rules: restrict([
      {
        group: ['@/app/*', '@/workspace', '@/workspace/*'],
        message: 'Features must not import app or workspace.',
      },
      {
        group: ['@/features', '@/features/*'],
        message:
          'Features must not import other features. Move shared code to shared/, or wire features together in workspace/flows. Inside a feature, use relative imports.',
      },
    ]),
  },
  {
    files: ['src/app/**', 'src/workspace/**'],
    rules: restrict([
      {
        group: ['@/features/*/*'],
        message: "Import a feature only through its public API: '@/features/<name>'.",
      },
    ]),
  },
  // Turn off ESLint formatting rules so Prettier owns formatting (keep this last)
  prettier,
]);

export default eslintConfig;
