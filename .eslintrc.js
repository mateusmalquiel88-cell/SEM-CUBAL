module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'plugin:jest/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-console': 'off'
  },
  overrides: [
    {
      files: ["test/**"],
      rules: {
        'node/no-unpublished-require': 'off'
      }
    }
  ]
};
