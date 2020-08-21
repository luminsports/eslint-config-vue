module.exports = {
  extends: [
    'plugin:vue/recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
      ecmaVersion: 2020
  },
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': ["error", { "args": "none", "ignoreRestSiblings": true }],
    'camelcase': 'off',
    'no-console': ['error', {'allow': ['warn', 'error']}],
    'no-debugger': 'error',
    'no-undef': 'off',
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'never'
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: 3,
      multiline: 1
    }],
    'vue/singleline-html-element-content-newline': 'off',
  },
}

