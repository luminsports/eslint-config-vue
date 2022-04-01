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
    '@typescript-eslint/no-unused-vars': ['error', {'args': 'none', 'ignoreRestSiblings': true}],
    'camelcase': 'off',
    'no-console': ['error', {'allow': ['warn', 'error']}],
    'no-debugger': 'error',
    'no-undef': 'off',
    'no-multi-spaces': ['error'],
    'indent': ['error', 2, {'FunctionExpression': {'parameters': 'first'}}],
    'computed-property-spacing': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'space-before-blocks': ['error', 'always'],
    'keyword-spacing': ['error', {'before': true, 'after': true}],
    'arrow-spacing': ['error', {'before': true, 'after': true}],
    'comma-spacing': ['error', {'before': false, 'after': true}],
    'array-bracket-spacing': ['error', 'never'],
    'func-call-spacing': ['error', 'never'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': ['error'],
    'space-unary-ops': ['error', {'words': true, 'nonwords': false, 'overrides': { '!': true }}],
    'function-call-argument-newline': ['error', 'consistent'],
    'function-paren-newline': ['error', 'consistent'],
    'object-curly-newline': ['error', {'consistent': true}],
    'prefer-const': ['error'],
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



