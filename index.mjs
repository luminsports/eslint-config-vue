import antfu from '@antfu/eslint-config'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import noBarrelFiles from 'eslint-plugin-no-barrel-files'
import importNewlines from 'eslint-plugin-import-newlines'
import fs from 'node:fs'

function loadPackageName () {
  try {
    const packageJsonPath = fs.realpathSync('./package.json')
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
    return packageJson.name
  } catch (e) {
    return undefined
  }
}

export default function configure (options, ...userConfig) {
  const packageName = options.packageName ?? loadPackageName()
  const vueOptions = options.vue === false ? false : (options.vue === true ? {} : (options.vue ?? {}))
  const tsOptions = options.typescript === false ? false : (options.typescript === true ? {} : (options.typescript ?? {}))
  const allowBarrelFiles = options.allowBarrelFiles === true
  return antfu({
    ...options,
    vue: vueOptions === false ? false : {
      ...vueOptions,
      overrides: {
        'unicorn/filename-case': ['error', { "case": "pascalCase" }],
        'vue/space-unary-ops': ['error', { words: true, nonwords: false, overrides: { '!': true } }],
        'vue/comma-style': ['error', 'last', { exceptions: { ImportDeclaration: false } }],
        'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'never' }],
        'vue/custom-event-name-casing': ['error', 'kebab-case', {
          ignores: ['/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u']
        }],
        'vue/max-attributes-per-line': ['error', { singleline: 3, multiline: 1 }],
        'vue/prefer-true-attribute-shorthand': ['error', 'always'],
        'vue/prefer-use-template-ref': ['error'],
        'vue/component-name-in-template-casing': ['error', 'PascalCase', {
          'registeredComponentsOnly': false,
        }],
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'never' }],
        'vue/valid-v-slot': ['error', {
          'allowModifiers': true
        }],
        'vue/html-indent': ['error', 2, {
          'attribute': 1,
          'baseIndent': 1,
          'closeBracket': 0,
          'alignAttributesVertically': true,
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
        'ts/explicit-function-return-type': 'off',
        'ts/consistent-generic-constructors': ['error', 'constructor'],
        'ts/consistent-indexed-object-style': ['error', 'record'],
        'ts/strict-boolean-expressions': 'off',
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
  }, allowBarrelFiles ? undefined : {
    files: ['**/export.ts'],
    plugins: {
      'no-barrel-files': noBarrelFiles
    },
    rules: {
      'no-barrel-files/no-barrel-files': 'off'
    }
  }, ...userConfig)
    .override('antfu/imports/rules', {
      plugins: {
        'import-newlines': importNewlines,
      },
      rules: {
        'import/named': 'error',
        'import/namespace': 'error',
        'import/default': 'error',
        'import/export': 'error',
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
        'import/no-duplicates': ['error', { 'prefer-inline': true }],
        'import/no-cycle': 'error',
        'import/consistent-type-specifier-style': 'off',
        'import/no-useless-path-segments': ['error', {
          noUselessIndex: true,
        }],
        'import-newlines/enforce': ['error', {
          'items': 5,
          'max-len': 100,
          'semi': false
        }],
      }
    })
    .override('antfu/stylistic/rules', {
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
    })
    .override('antfu/jsdoc/rules', {
      rules: {
        'jsdoc/require-returns-description': 'off',
      }
    })
    .override('antfu/typescript/rules-type-aware', {
      rules: {
        'ts/no-floating-promises': 'off',
      }
    })
    .override('antfu/typescript/rules-type-aware', {
      settings: {
        'import-x/resolver-next': [
          createTypeScriptImportResolver({
            project: tsOptions.tsconfigPath,
            alwaysTryTypes: true,
          })
        ],
      },
      rules: {
        'import/no-unresolved': 'error',
        'ts/no-unsafe-assignment': 'off',
        'ts/no-unsafe-call': 'off',
        'ts/no-unsafe-argument': 'off',
        'ts/no-unsafe-member-access': 'off',
        'ts/strict-boolean-expressions': 'off',
        'ts/no-unsafe-return': 'off',
      }
    })
    .override('antfu/javascript/rules', {
      plugins: allowBarrelFiles ? {} : {
        'no-barrel-files': noBarrelFiles,
      },
      rules: {
        'camelcase': 'off',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-debugger': 'error',
        'no-multi-spaces': 'error',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-case-declarations': 'off',
        'no-prototype-builtins': 'off',
        'unused-imports/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            caughtErrors: 'none',
            ignoreRestSiblings: true,
            vars: 'all',
            varsIgnorePattern: '^_',
          },
        ],
        ...(allowBarrelFiles ? {} : {
          'no-barrel-files/no-barrel-files': 'error',
        }),
        'no-restricted-imports': ['error', {
          'patterns': [
            {
              'regex': '^src\/',
              'message': 'Importing from src directory is not allowed.'
            },
            packageName ? {
              'regex': `^${packageName}`,
              'message': 'Do not import from own library files. Use relative path imports instead.'
            } : undefined,
            allowBarrelFiles ? undefined : {
              'group': ['@luminsports/**/export', '@luminsports/**/index', './**/export', './**/index', '../**/export', '../**/index'],
              'message': 'Do not import from barrel files. Import from the specific file instead.'
            }
          ].filter(p => !!p)
        }],
        'prefer-const': 'error',
      }
    })
}

