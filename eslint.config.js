import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginJest from 'eslint-plugin-jest';
import pluginCypress from 'eslint-plugin-cypress';
import { defineConfig } from 'eslint/config';
import daStyle from 'eslint-config-dicodingacademy';

export default defineConfig([
  // ✅ Konfigurasi dasar JS
  js.configs.recommended,

  // ✅ Global browser
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.browser,
    },
  },

  // ✅ Jest test files
  {
    files: ['**/*.test.{js,jsx}', '**/*.spec.{js,jsx}'],
    plugins: {
      jest: pluginJest,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      ...pluginJest.configs.recommended.rules,
    },
  },

  // ✅ Jest setup
  {
    files: ['jest.setup.js'],
    languageOptions: {
      globals: globals.node,
    },
  },

  // ✅ Cypress e2e test
  {
    files: ['cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'],
    plugins: {
      cypress: pluginCypress,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha,
      },
    },
    rules: {
      ...pluginCypress.configs.recommended.rules,
    },
  },

  // ✅ React plugin
  pluginReact.configs.flat.recommended,

  // ✅ Dicoding style guide
  daStyle,
]);
