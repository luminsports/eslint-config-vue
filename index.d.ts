import { Linter } from 'eslint'

export interface ConfigureOptions {
  allowBarrelFiles?: boolean
  oxlint?: boolean
  packageName?: string
  type?: string
  vue?: boolean
  typescript?: boolean | {
    tsconfigPath?: string
  }
  [key: string]: unknown
}

declare function configure (options?: ConfigureOptions, ...userConfigs: Array<Linter.Config | Linter.Config[]>): Linter.Config[]

export default configure
