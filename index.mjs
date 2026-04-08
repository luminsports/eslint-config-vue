import antfu from 'eslint-plugin-antfu'
import eslintComments from '@eslint-community/eslint-plugin-eslint-comments'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import importNewlines from 'eslint-plugin-import-newlines'
import pluginImportX from 'eslint-plugin-import-x'
import unicorn from 'eslint-plugin-unicorn'
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

function createTypeScriptConfigs (tsconfigPath) {
  return [
    {
      name: 'luminsports/typescript-rules',
      files: ['**/*.{ts,mts,cts,tsx}'],
      plugins: {
        typescript: typescriptPlugin,
        'import-x': pluginImportX,
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
      plugins: {
        vue: pluginVue,
      },
      languageOptions: {
        parser: vueParser,
        parserOptions: {
          ecmaVersion: 'latest',
          extraFileExtensions: ['.vue'],
          parser: typescriptParser,
          sourceType: 'module',
        },
      },
      rules: {
        'vue/comment-directive': 'error',
        'vue/no-mutating-props': 'error',
        'vue/no-child-content': 'error',
        'vue/no-dupe-v-else-if': 'error',
        'vue/no-duplicate-attributes': 'error',
        'vue/no-parsing-error': 'error',
        'vue/no-textarea-mustache': 'error',
        'vue/no-unused-components': 'error',
        'vue/no-unused-vars': 'error',
        'vue/no-use-v-if-with-v-for': 'error',
        'vue/no-v-for-template-key-on-child': 'warn',
        'vue/no-v-text-v-html-on-component': 'error',
        'vue/prefer-use-template-ref': 'error',
        'vue/require-v-for-key': 'error',
        'vue/valid-attribute-name': 'error',
        'vue/valid-template-root': 'error',
        'vue/valid-v-bind': 'error',
        'vue/valid-v-cloak': 'error',
        'vue/valid-v-else-if': 'error',
        'vue/valid-v-else': 'error',
        'vue/valid-v-for': 'error',
        'vue/valid-v-html': 'error',
        'vue/valid-v-if': 'error',
        'vue/valid-v-is': 'error',
        'vue/valid-v-memo': 'error',
        'vue/valid-v-model': 'error',
        'vue/valid-v-on': 'error',
        'vue/valid-v-once': 'error',
        'vue/valid-v-pre': 'error',
        'vue/valid-v-show': 'error',
        'vue/valid-v-slot': ['error', {
          allowModifiers: true,
        }],
        'vue/valid-v-text': 'error',
        'vue/component-name-in-template-casing': ['error', 'PascalCase', {
          registeredComponentsOnly: false,
        }],
        'vue/custom-event-name-casing': ['error', 'kebab-case', {
          ignores: ['/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u'],
        }],
        'vue/html-closing-bracket-spacing': 'warn',
        'vue/html-end-tags': 'warn',
        'vue/html-quotes': ['error', 'double'],
        'vue/html-self-closing': 'warn',
        'vue/no-spaces-around-equal-signs-in-attribute': 'warn',
        'array-bracket-spacing': ['error', 'never'],
        'arrow-parens': ['error', 'as-needed'],
        'arrow-spacing': ['error', {
          after: true,
          before: true,
        }],
        'block-spacing': ['error', 'always'],
        'brace-style': ['error', 'stroustrup', {
          allowSingleLine: true,
        }],
        'comma-dangle': ['error', 'always-multiline'],
        'comma-spacing': ['error', {
          after: true,
          before: false,
        }],
        'comma-style': ['error', 'last'],
        'vue/array-bracket-spacing': ['error', 'never'],
        'vue/arrow-spacing': ['error', {
          after: true,
          before: true,
        }],
        'vue/block-spacing': ['error', 'always'],
        'vue/block-tag-newline': ['error', {
          multiline: 'always',
          singleline: 'always',
        }],
        'vue/brace-style': ['error', 'stroustrup', {
          allowSingleLine: true,
        }],
        'vue/comma-dangle': ['error', 'always-multiline'],
        'vue/comma-spacing': ['error', {
          after: true,
          before: false,
        }],
        'vue/comma-style': ['error', 'last', {
          exceptions: {
            ImportDeclaration: false,
          },
        }],
        'vue/first-attribute-linebreak': 'warn',
        'vue/html-closing-bracket-newline': ['error', {
          multiline: 'never',
          singleline: 'never',
        }],
        'key-spacing': ['error', {
          afterColon: true,
          beforeColon: false,
        }],
        'keyword-spacing': ['error', {
          after: true,
          before: true,
        }],
        'vue/key-spacing': ['error', {
          afterColon: true,
          beforeColon: false,
        }],
        'vue/keyword-spacing': ['error', {
          after: true,
          before: true,
        }],
        'vue/html-indent': ['error', 2, {
          attribute: 1,
          baseIndent: 1,
          closeBracket: 0,
          alignAttributesVertically: true,
        }],
        'object-curly-spacing': ['error', 'always'],
        'object-property-newline': ['error', {
          allowAllPropertiesOnSameLine: true,
        }],
        'operator-linebreak': ['error', 'before'],
        'vue/max-attributes-per-line': ['error', {
          multiline: 1,
          singleline: 3,
        }],
        'vue/mustache-interpolation-spacing': 'warn',
        'quote-props': ['error', 'as-needed'],
        'quotes': ['error', 'single', {
          avoidEscape: true,
        }],
        'semi': ['error', 'never'],
        'space-in-parens': ['error', 'never'],
        'space-infix-ops': 'error',
        'vue/object-curly-spacing': ['error', 'always'],
        'vue/object-property-newline': ['error', {
          allowAllPropertiesOnSameLine: true,
        }],
        'vue/operator-linebreak': ['error', 'before'],
        'vue/prefer-true-attribute-shorthand': ['error', 'always'],
        'vue/singleline-html-element-content-newline': 'off',
        'vue/quote-props': ['error', 'consistent-as-needed'],
        'vue/script-indent': ['error', 2, {
          baseIndent: 0,
          switchCase: 1,
        }],
        'eol-last': ['error', 'always'],
        'vue/space-in-parens': ['error', 'never'],
        'vue/template-curly-spacing': 'error',
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
