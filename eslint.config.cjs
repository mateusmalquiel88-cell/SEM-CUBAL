module.exports = [
  // Ignore generated and dependency directories
  {
    ignores: ['node_modules/**', 'coverage/**', 'dist/**']
  },

  // Base config: language and small set of rules
  {
    languageOptions: {
      ecmaVersion: 2021
    },
    plugins: {
      node: require('eslint-plugin-node'),
      jest: require('eslint-plugin-jest')
    },
    rules: {
      'no-console': 'off'
      // rely on plugin rules selectively; keep config compact for now
    }
  },

  // Test files overrides
  {
    files: ['test/**'],
    rules: {
      'node/no-unpublished-require': 'off'
    }
  }
];
