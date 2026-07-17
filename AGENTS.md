# Repository Guidelines

This package publishes the shared `@luminsports/eslint-config-vue` configuration.

- Treat `index.mjs` and `index.d.ts` as the public API and keep them aligned.
- Keep changes narrow; do not add build tooling or scripts unless explicitly requested.
- Do not bump the package version or publish a release unless explicitly requested.
- Validate JavaScript changes with `node --check index.mjs` and run `git diff --check`.
- Preserve unrelated dirty work and report checks that cannot be run.
