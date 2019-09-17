module.exports = {
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  rules: {
    'no-console': ['error', {'allow': ['warn', 'error']}],
    'no-debugger': 'error',
    'camelcase': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: 3,
      multiline: 1
    }],
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never'
    }],
    'no-undef': 'off',
    'no-unused-vars': 'off'
  },
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser')
  }
}

