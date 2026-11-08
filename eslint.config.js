import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist', 'node_modules', 'coverage'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: { react: { version: 'detect' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react/prop-types': 'off',
      // Apostrophes/quotes in copy render fine; escaping them adds noise.
      'react/no-unescaped-entities': 'off',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
      // Many selectable "cards" are still <div onClick>. These are real a11y
      // debt, tracked as warnings so they're visible without blocking CI while
      // the flow is converted to native buttons screen-by-screen.
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
      // Setting a loading flag inside an effect (then resolving async) is a
      // deliberate, valid pattern here; flag as a warning, not a hard error.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  {
    files: ['**/*.test.{js,jsx}', 'src/test/**'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node, vi: 'readonly' },
    },
  },
  {
    files: ['vite.config.js', 'vitest.config.js', 'eslint.config.js'],
    languageOptions: { globals: { ...globals.node } },
  },
]
