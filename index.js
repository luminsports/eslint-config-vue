module.exports = {
  extends: [
    'plugin:vue/recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    project: ['./tsconfig.json'],
  },
  plugins: [
    'import',
    'import-newlines',
    'canonical',
    'unused-imports'
  ],
  settings: {
    'import/resolver': {
      'typescript': true,
      'node': true
    }
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/brace-style': 'error',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/consistent-generic-constructors': ['error', 'constructor'],
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
    '@typescript-eslint/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: true }],
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
    '@typescript-eslint/indent': ['error', 2, {
      FunctionExpression: { parameters: 'first' },
      ignoredNodes: [
        "PropertyDefinition[decorators]",
        'FunctionExpression > .params[decorators.length > 0]',
        'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
        'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
      ],
    }],
    '@typescript-eslint/member-delimiter-style': ['error', {
      multiline: { delimiter: 'none' },
      singleline: { delimiter: 'comma' }
    }],
    '@typescript-eslint/no-confusing-void-expression': ['error', { ignoreVoidOperator: true }],
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/semi': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'brace-style': 'off',
    'camelcase': 'off',
    'canonical/prefer-inline-type-import': 'error',
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-style': ['error', 'last', { exceptions: { ImportDeclaration: false }}],
    'computed-property-spacing': ['error', 'never'],
    'func-call-spacing': ['error', 'never'],
    'function-call-argument-newline': ['error', 'consistent'],
    'function-paren-newline': ['error', 'consistent'],
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/no-duplicates': 'error',
    'import-newlines/enforce': ['error', {
      'items': 5,
      'max-len': 100,
      'semi': false
    }],
    'indent': 'off',
    'keyword-spacing': ['error', { before: true, after: true }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-multi-spaces': 'error',
    'no-undef': 'off',
    'object-curly-newline': ['error', { multiline: true, consistent: true }],
    'object-curly-spacing': ['error', 'always'],
    'prefer-const': 'error',
    'quote-props': ['error', 'consistent-as-needed'],
    'semi': 'off',
    'space-before-blocks': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': ['error', { words: true, nonwords: false, overrides: { '!': true } }],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }],
    'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'never' }],
    'vue/max-attributes-per-line': ['error', { singleline: 3, multiline: 1 }],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/valid-v-slot': ['error', {
      'allowModifiers': true
    }]
  }
}
