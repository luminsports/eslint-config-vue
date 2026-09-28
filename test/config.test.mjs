import assert from 'node:assert/strict'
import test from 'node:test'
import { ESLint } from 'eslint'
import configure from '../index.mjs'

async function lintText (code, filePath, options = {}, userConfigs = []) {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: configure(options, ...userConfigs),
  })

  return eslint.lintText(code, { filePath })
}

function ruleIds (result) {
  return result.messages.map(message => message.ruleId)
}

test('applies JavaScript, TypeScript, and Vue rules through the public configuration', async () => {
  const [javascriptResult] = await lintText(
    "import defaultValue from './module.js'\n\nvoid defaultValue\n",
    'test/fixtures/javascript/consumer.js',
  )
  const [typescriptResult] = await lintText(
    'interface Service { execute(): void }\n',
    'fixture.ts',
  )
  const [vueResult] = await lintText(
    '<template>\n  <article id=\'summary\'></article>\n</template>\n',
    'fixture.vue',
  )

  assert.deepEqual(ruleIds(javascriptResult), ['import-x/default'])
  assert.deepEqual(ruleIds(typescriptResult), ['typescript/method-signature-style'])
  assert.ok(ruleIds(vueResult).includes('vue/html-quotes'))
})

test('does not apply Vue or TypeScript rules when those features are disabled', async () => {
  const [vueResult] = await lintText(
    '<template>\n  <article id=\'summary\'></article>\n</template>\n',
    'fixture.vue',
    { vue: false },
  )
  const [typescriptResult] = await lintText(
    "import { summary } from './test/fixtures/javascript/module.js'\n",
    'fixture.ts',
    { typescript: false },
  )

  assert.equal(vueResult.errorCount, 0)
  assert.equal(typescriptResult.errorCount, 0)
})

test('uses tsconfigPath to reject an unresolved TypeScript import', async () => {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: configure({
      typescript: {
        tsconfigPath: 'test/fixtures/tsconfig.json',
      },
    }),
  })

  const [result] = await eslint.lintFiles(['test/fixtures/typescript/missing-import.ts'])

  assert.ok(ruleIds(result).includes('import-x/no-unresolved'))
})

test('applies nested consumer overrides after its own rules', async () => {
  const [result] = await lintText(
    'console.log("summary")\n',
    'fixture.js',
    {},
    [null, [{ rules: { 'no-console': 'error' } }]],
  )

  assert.ok(ruleIds(result).includes('no-console'))
})
