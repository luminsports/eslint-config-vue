import antfu from '@antfu/eslint-config'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import noBarrelFiles from 'eslint-plugin-no-barrel-files'
import importNewlines from 'eslint-plugin-import-newlines'
import disableAutofix from 'eslint-plugin-disable-autofix'

export default function configure (options, ...userConfig) {
  const vueOptions = options.vue === false ? false : (options.vue === true ? {} : (options.vue ?? {}))
  const tsOptions = options.typescript === false ? false : (options.typescript === true ? {} : (options.typescript ?? {}))

  return antfu({
    ...options,
    vue: vueOptions === false ? false : {
      ...vueOptions,
      overrides: {
        'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'never' }],
        'vue/max-attributes-per-line': ['error', { singleline: 3, multiline: 1 }],
        'vue/singleline-html-element-content-newline': 'off',
        'vue/valid-v-slot': ['error', {
          'allowModifiers': true
        }],
        // vue3 compatibility warnings
        'vue/no-v-for-template-key-on-child': 'warn',
        'vue/no-deprecated-v-bind-sync': 'off',
        'disable-autofix/vue/no-deprecated-v-bind-sync': 'warn',
        ...vueOptions.overrides,
      }
    },
    typescript: tsOptions === false ? false : {
      ...tsOptions,
      overrides: {
        'ts/ban-ts-comment': 'off',
        'ts/brace-style': 'error',
        'ts/camelcase': 'off',
        'ts/consistent-generic-constructors': ['error', 'constructor'],
        'ts/consistent-indexed-object-style': ['error', 'record'],
        'ts/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: true }],
        'ts/consistent-type-imports': ['error', {
          disallowTypeAnnotations: false,
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports'
        }],
        'ts/indent': ['error', 2, {
          FunctionExpression: { parameters: 'first' },
          ignoredNodes: [
            "PropertyDefinition[decorators]",
            'FunctionExpression > .params[decorators.length > 0]',
            'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
            'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
          ],
        }],
        'ts/member-delimiter-style': ['error', {
          multiline: { delimiter: 'none' },
          singleline: { delimiter: 'comma' }
        }],
        // temporarily disabled due to "Maximum call stack size exceeded" error
        // 'ts/no-confusing-void-expression': ['error', { ignoreVoidOperator: true }],
        'ts/no-empty-interface': 'off',
        'ts/no-inferrable-types': 'off',
        'ts/object-curly-spacing': ['error', 'always'],
        'ts/semi': ['error', 'never'],
        ...tsOptions.overrides,
      }
    },
  }, {
  }, {
    files: ['**/export.ts'],
    plugins: {
      'no-barrel-files': noBarrelFiles
    },
    rules: {
      'no-barrel-files/no-barrel-files': 'off'
    }
  }, ...userConfig)
  .override(
    'antfu/vue', {
      plugins: {
        'disable-autofix': disableAutofix,
      }
    }
  )
  .override(
    'antfu/imports', {
      plugins: {
        'import-newlines': importNewlines,
      },
      settings: tsOptions && 'tsconfigPath' in tsOptions ? {
        'import/resolver-next': [
          createTypeScriptImportResolver({
            alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
            project: tsOptions.tsconfigPath,
          }),
        ],
      } : {},
      rules: {
        'import/no-unresolved': 'error',
        'import/named': 'error',
        'import/namespace': 'error',
        'import/default': 'error',
        'import/export': 'error',
        'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
        'import/order': [
          'error',
          {
            'newlines-between': 'never',
            'named': { enabled: true, import: true, export: true, require: true, types: 'types-first' },
            'alphabetize': {
              order: 'asc',
            },
            'groups': [
              'builtin',
              ['external', 'internal'],
              'parent',
              ['sibling', 'index'],
              'object',
            ]
          }
        ],
        'import/no-cycle': 'error',
        'import/no-useless-path-segments': ['error', {
          noUselessIndex: true,
        }],
        'import-newlines/enforce': ['error', {
          'items': 5,
          'max-len': 100,
          'semi': false
        }],
      }
    }
  )
  .override(
    'antfu/javascript', {
      plugins: {
        'no-barrel-files': noBarrelFiles,
      },
      rules: {
        'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
        'array-bracket-spacing': ['error', 'never'],
        'arrow-spacing': ['error', { before: true, after: true }],
        'brace-style': 'off',
        'camelcase': 'off',
        'comma-spacing': ['error', { before: false, after: true }],
        'comma-style': ['error', 'last', { exceptions: { ImportDeclaration: false } }],
        'computed-property-spacing': ['error', 'never'],
        'func-call-spacing': ['error', 'never'],
        'function-call-argument-newline': ['error', 'consistent'],
        'function-paren-newline': ['error', 'consistent'],
        'indent': 'off',
        'keyword-spacing': ['error', { before: true, after: true }],
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-barrel-files/no-barrel-files': 'error',
        'no-debugger': 'error',
        'no-multi-spaces': 'error',
        'no-undef': 'off',
        'no-restricted-imports': ['error', {
          'patterns': [{
            'group': ['@luminsports/**/export', '@luminsports/**/index', './**/export', './**/index', '../**/export', '../**/index'],
            'message': 'Do not import from barrel files. Import from the specific file instead.'
          }]
        }],
        'object-curly-newline': ['error', { multiline: true, consistent: true }],
        'object-curly-spacing': ['error', 'always'],
        'prefer-const': 'error',
        'quote-props': ['error', 'consistent-as-needed'],
        'semi': 'off',
        'space-before-blocks': ['error', 'always'],
        'space-in-parens': ['error', 'never'],
        'space-infix-ops': 'error',
        'space-unary-ops': ['error', { words: true, nonwords: false, overrides: { '!': true } }],
      }
    }
  )
}
