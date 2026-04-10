import antfu from 'eslint-plugin-antfu'
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import importNewlines from 'eslint-plugin-import-newlines'
import pluginImportX from 'eslint-plugin-import-x'
import unicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

function flattenUserConfigs (configs) {
  return configs.flatMap((config) => {
    if (!config) {
      return []
    }

    if (Array.isArray(config)) {
      return flattenUserConfigs(config)
    }

    return [config]
  })
}

function isInEditorEnv() {
  if (process.env.CI)
    return false
  if (isInGitHooksOrLintStaged())
    return false
  return !!(false
    || process.env.VSCODE_PID
    || process.env.VSCODE_CWD
    || process.env.JETBRAINS_IDE
    || process.env.VIM
    || process.env.NVIM
    || (process.env.ZED_ENVIRONMENT && !process.env.ZED_TERM)
  )
}

function isInGitHooksOrLintStaged() {
  return !!(false
    || process.env.GIT_PARAMS
    || process.env.VSCODE_GIT_COMMAND
    || process.env.npm_lifecycle_script?.startsWith('lint-staged')
  )
}

const isInEditor = isInEditorEnv()

function createTypeScriptConfigs (tsconfigPath) {
  return [
    {
      name: 'luminsports/typescript-rules',
      files: ['**/*.{ts,mts,cts,tsx}'],
      plugins: {
        typescript: typescriptPlugin,
        'import-x': pluginImportX,
        'unused-imports': unusedImports,
      },
      languageOptions: {
        parser: typescriptParser,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 'latest',
          sourceType: 'module',
          ...(tsconfigPath ? {
            project: tsconfigPath,
            tsconfigRootDir: process.cwd(),
          } : {}),
        },
      },
      ...(tsconfigPath ? {
        settings: {
          'import-x/resolver-next': [
            createTypeScriptImportResolver({
              alwaysTryTypes: true,
              project: tsconfigPath,
            }),
          ],
        },
      } : {}),
      rules: {
        'typescript/method-signature-style': ['error', 'property'],
        'unused-imports/no-unused-imports': isInEditor ? 'warn' : 'error',
        ...(tsconfigPath ? { 'import-x/no-unresolved': 'error' } : {}),
      },
    },
  ]
}

function createVueConfigs () {
  return [
    {
      name: 'luminsports/vue-rules',
      files: ['**/*.vue'],
      processor: pluginVue.processors['.vue'],
      plugins: {
        typescript: typescriptPlugin,
        vue: pluginVue,
        'unused-imports': unusedImports,
      },
      languageOptions: {
        parser: vueParser,
        parserOptions: {
          ecmaVersion: 'latest',
          extraFileExtensions: ['.vue'],
          parser: typescriptParser,
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      rules: {
        'unused-imports/no-unused-imports': isInEditor ? 'warn' : 'error',
        'typescript/consistent-type-imports': [
          'error',
          {
            disallowTypeAnnotations: false,
            fixStyle: 'inline-type-imports',
            prefer: 'type-imports',
          },
        ],
        ...pluginVue.configs.base.rules,
        ...pluginVue.configs['flat/essential'].map(c => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}),
        ...pluginVue.configs['flat/strongly-recommended'].map(c => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}),
        ...pluginVue.configs['flat/recommended'].map(c => c.rules).reduce((acc, c) => ({ ...acc, ...c }), {}),
        'vue/block-order': ['error', {
          order: ['script', 'template', 'style'],
        }],
        'vue/component-name-in-template-casing': ['error', 'PascalCase', {
          registeredComponentsOnly: false,
        }],
        'vue/component-options-name-casing': ['error', 'PascalCase'],
        'vue/custom-event-name-casing': ['error', 'kebab-case', {
          ignores: ['/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u'],
        }],
        'vue/define-macros-order': ['error', {
          order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
        }],
        'vue/dot-location': ['error', 'property'],
        'vue/dot-notation': ['error', { allowKeywords: true }],
        'vue/eqeqeq': ['error', 'smart'],
        'vue/html-indent': ['error', 2, {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: true,
        }],
        'vue/html-quotes': ['error', 'double'],
        'vue/max-attributes-per-line': ['error', {
          multiline: 1,
          singleline: 3,
        }],
        'vue/no-empty-pattern': 'error',
        'vue/no-irregular-whitespace': 'error',
        'vue/no-loss-of-precision': 'error',
        'vue/no-restricted-syntax': [
          'error',
          'DebuggerStatement',
          'LabeledStatement',
          'WithStatement',
        ],
        'vue/no-restricted-v-bind': ['error', '/^v-/'],
        'vue/no-sparse-arrays': 'error',
        'vue/no-unused-refs': 'error',
        'vue/no-useless-v-bind': 'error',
        'vue/object-shorthand': [
          'error',
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: false,
          },
        ],
        'vue/prefer-separate-static-class': 'error',
        'vue/prefer-template': 'error',
        'vue/space-infix-ops': 'error',
        'vue/space-unary-ops': ['error', { nonwords: false, words: true }],
        'vue/array-bracket-spacing': ['error', 'never'],
        'vue/block-spacing': ['error', 'always'],
        'vue/brace-style': ['error', '1tbs', { allowSingleLine: true }],
        'vue/comma-dangle': ['error', 'always-multiline'],
        'vue/comma-spacing': ['error', { after: true, before: false }],
        'vue/comma-style': ['error', 'last', {
          exceptions: {
            ImportDeclaration: false,
          },
        }],
        'vue/html-comment-content-spacing': ['error', 'always', {
          exceptions: ['-'],
        }],
        'vue/key-spacing': ['error', { afterColon: true, beforeColon: false }],
        'vue/keyword-spacing': ['error', { after: true, before: true }],
        'vue/object-curly-spacing': ['error', 'always'],
        'vue/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
        'vue/operator-linebreak': ['error', 'before'],
        'vue/padding-line-between-blocks': ['error', 'always'],
        'vue/quote-props': ['error', 'consistent-as-needed'],
        'vue/space-in-parens': ['error', 'never'],
        'vue/template-curly-spacing': 'error',
        'vue/prefer-use-template-ref': 'error',
        'vue/valid-v-slot': ['error', {
          allowModifiers: true,
        }],
        'vue/block-tag-newline': ['error', {
          multiline: 'always',
          singleline: 'always',
        }],
        'vue/html-closing-bracket-newline': ['error', {
          multiline: 'never',
          singleline: 'never',
        }],
        'vue/script-indent': ['error', 2, {
          baseIndent: 0,
          switchCase: 1,
        }],


        'vue/component-tags-order': 'off',
        'vue/no-setup-props-reactivity-loss': 'off',
        'vue/object-curly-newline': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-dupe-keys': 'off',
        'vue/no-v-html': 'off',
        'vue/require-default-prop': 'off',
        'vue/require-prop-types': 'off',
        'vue/no-arrow-functions-in-watch': 'off',
        'vue/no-export-in-script-setup': 'off',
        'vue/no-lifecycle-after-await': 'off',
        'vue/no-multiple-slot-args': 'off',
        'vue/no-required-prop-with-default': 'off',
        'vue/prefer-import-from-vue': 'off',
        'vue/valid-define-emits': 'off',
        'vue/valid-define-props': 'off',
        'vue/jsx-uses-vars': 'off',
        'vue/no-async-in-computed-properties': 'off',
        'vue/no-computed-properties-in-data': 'off',
        'vue/no-expose-after-await': 'off',
        'vue/no-ref-as-operand': 'off',
        'vue/no-shared-component-data': 'off',
        'vue/no-side-effects-in-computed-properties': 'off',
        'vue/no-watch-after-await': 'off',
        'vue/return-in-computed-property': 'off',
        'vue/return-in-emits-validator': 'off',
        'vue/valid-next-tick': 'off',
      },
    },
  ]
}

export default function configure (options = {}, ...userConfigs) {
  const typescriptOptions = options.typescript === false
    ? false
    : (typeof options.typescript === 'object' && options.typescript !== null ? options.typescript : {})

  const configs = [
    {
      name: 'luminsports/common-rules',
      files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,vue}'],
      linterOptions: {
        reportUnusedDisableDirectives: 'off',
      },
      languageOptions: {
        ecmaVersion: 'latest',
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
        sourceType: 'module',
      },
      plugins: {
        antfu,
        'eslint-comments': eslintComments,
        'import-newlines': importNewlines,
        'import-x': pluginImportX,
        unicorn,
      },
      rules: {
        'import-x/namespace': 'error',
        'import-x/default': 'error',
        'import-x/export': 'error',
      },
    },
    ...(options.vue === false ? [] : createVueConfigs()),
    ...(typescriptOptions === false ? [] : createTypeScriptConfigs(typescriptOptions.tsconfigPath)),
    ...flattenUserConfigs(userConfigs),
  ]

  return configs
}
