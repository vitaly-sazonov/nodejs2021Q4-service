module.exports = {
  root: true,
  env: {
    es2020: true,
    jasmine: true,
    jest: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
    sourceType: 'module',
    ecmaVersion: 2021,
    createDefaultProgram: true,
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  settings: {
    noInlineConfig: true,
    'import/resolver': {
      node: {
        extensions: ['.ts'],
      },
    },
    node: {
      resolvePaths: [__dirname],
      tryExtensions: ['.ts'],
    },
  },
  plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc'],
  extends: ['eslint:recommended', 'plugin:node/recommended', 'airbnb-base', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'node/no-missing-import': 'error',
    'node/no-unsupported-features/es-syntax': 'off',
    'linebreak-style': 'off',
    'no-underscore-dangle': 'off',
    'tsdoc/syntax': 'error',
    'no-shadow': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-explicit-any': ['error'],
    '@typescript-eslint/no-shadow': 'off',
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
  },
};
