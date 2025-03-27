import antfu from '@antfu/eslint-config'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import noBarrelFiles from 'eslint-plugin-no-barrel-files'
import importNewlines from 'eslint-plugin-import-newlines'
import oxlint from 'eslint-plugin-oxlint'

export default function configure (options, ...userConfig) {
  const vueOptions = options.vue === false ? false : (options.vue === true ? {} : (options.vue ?? {}))
  const tsOptions = options.typescript === false ? false : (options.typescript === true ? {} : (options.typescript ?? {}))

  return antfu({
    ...options,
    vue: vueOptions === false ? false : {
      ...vueOptions,
      overrides: {
        'vue/space-unary-ops': ['error', { words: true, nonwords: false, overrides: { '!': true } }],
        'vue/comma-style': ['error', 'last', { exceptions: { ImportDeclaration: false } }],
        'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'never' }],
        'vue/custom-event-name-casing': ['error', 'kebab-case'],
        'vue/max-attributes-per-line': ['error', { singleline: 3, multiline: 1 }],
        'vue/singleline-html-element-content-newline': 'off',
        'vue/valid-v-slot': ['error', {
          'allowModifiers': true
        }],
        // vue3 compatibility warnings
        'vue/no-v-for-template-key-on-child': 'warn',
        'vue/no-deprecated-v-bind-sync': 'off',
        ...vueOptions.overrides,
      }
    },
    typescript: tsOptions === false ? false : {
      ...tsOptions,
      overrides: {
        'ts/ban-ts-comment': 'off',
        'ts/camelcase': 'off',
        'ts/consistent-generic-constructors': ['error', 'constructor'],
        'ts/consistent-indexed-object-style': ['error', 'record'],
        //'ts/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: true }],
        'ts/consistent-type-imports': ['error', {
          disallowTypeAnnotations: false,
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports'
        }],
        // temporarily disabled due to "Maximum call stack size exceeded" error
        // 'ts/no-confusing-void-expression': ['error', { ignoreVoidOperator: true }],
        'ts/no-empty-interface': 'off',
        'ts/no-inferrable-types': 'off',
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
  }, ...userConfig, options.oxlint ? undefined : oxlint.configs['flat/recommended'] )
    .override(
      'antfu/imports/rules', {
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
        'import/consistent-type-specifier-style': 'off',
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
      'antfu/stylistic/rules', {
      rules: {
        // conflicts with import/order
        'perfectionist/sort-named-imports': 'off',
        'perfectionist/sort-named-exports': 'off',
        'perfectionist/sort-imports': 'off',
        'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
        'style/object-curly-spacing': ['error', 'always'],
        'style/space-unary-ops': ['error', { words: true, nonwords: false, overrides: { '!': true } }],
        'style/object-curly-newline': ['error', { multiline: true, consistent: true }],
        'style/object-curly-spacing': ['error', 'always'],
        'style/quote-props': ['error', 'consistent-as-needed'],
        'style/semi': ['error', 'never'],
        'style/space-before-blocks': ['error', 'always'],
        'style/space-in-parens': ['error', 'never'],
        'style/space-infix-ops': 'error',
        'style/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
        'style/array-bracket-spacing': ['error', 'never'],
        'style/arrow-spacing': ['error', { before: true, after: true }],
        'style/comma-spacing': ['error', { before: false, after: true }],
        'style/comma-style': ['error', 'last', { exceptions: { ImportDeclaration: false } }],
        'style/computed-property-spacing': ['error', 'never'],
        'style/func-call-spacing': ['error', 'never'],
        'style/function-call-argument-newline': ['error', 'consistent'],
        'style/function-paren-newline': ['error', 'consistent'],
        'style/keyword-spacing': ['error', { before: true, after: true }],
        'style/member-delimiter-style': ['error', {
          multiline: { delimiter: 'none' },
          singleline: { delimiter: 'comma' }
        }],
      }
    }
    )
    .override(
      'antfu/javascript/rules', {
      plugins: {
        'no-barrel-files': noBarrelFiles,
      },
      rules: {
        'camelcase': 'off',
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
        'prefer-const': 'error',
      }
    }
    )
}

