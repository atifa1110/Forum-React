import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginJest from 'eslint-plugin-jest';
import pluginCypress from 'eslint-plugin-cypress';
import { defineConfig } from 'eslint/config';
import daStyle from 'eslint-config-dicodingacademy';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,jsx}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,jsx}'], languageOptions: { globals: globals.browser } },
  { files: ['**/*.test.{js,jsx}', '**/*.spec.{js,jsx}'],
    plugins: { jest: pluginJest },
    languageOptions: { globals: { ...globals.jest } },
    rules: { ...pluginJest.configs.recommended.rules }
  },
  { files: ['jest.setup.js'],
    languageOptions: { globals: globals.node }
  },
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
        ...pluginCypress.environments.globals,
      },
    },
    rules: {
      ...pluginCypress.configs.recommended.rules,
    },
  },
  pluginReact.configs.flat.recommended,
  daStyle
]);
