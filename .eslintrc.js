module.exports = {
    root: true,
    env: {
      node: true,
      es6: true,
    },
    parserOptions: { ecmaVersion: 8 }, 
    ignorePatterns: ['node_modules/*', '.next/*', '.out/*', '!.prettierrc.js'], 
    extends: ['eslint:recommended'],
    overrides: [
      {
        files: ['**/*.ts', '**/*.tsx'],
        parser: '@typescript-eslint/parser',
        settings: { react: { version: 'detect' } },
        env: {
          browser: true,
          node: true,
          es6: true,
        },
        extends: [
          'eslint:recommended',
          'plugin:react/recommended',
          'plugin:react-hooks/recommended', 
          'plugin:prettier/recommended'
        ],
        rules: {
          'react/prop-types': 'off',
          'prettier/prettier': ['error', {}, { usePrettierrc: true }],
          "react/react-in-jsx-scope": "off",
        },
      },
    ],
  }
  