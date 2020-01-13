module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'plugin:prettier/recommended',
    'plugin:import/errors',
  ],
  plugins: ['react', 'prettier', 'import'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      alias: { map: [['~', './src']] },
      extensions: ['.js', '.json'],
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    // because with next we import static from public folder using absolute path
    'import/no-absolute-path': 'off',
    'no-debugger': 'off',
    'promise/param-names': 'off',
    'react/prop-types': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '~/**',
            group: 'internal',
          },
        ],
      },
    ],
  },
};
