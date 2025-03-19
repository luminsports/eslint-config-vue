/**
 * Copyright (c) 2025 Lumin Sports Technology - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */
import { Linter } from 'eslint'
import { Awaitable, OptionsConfig, TypedFlatConfigItem, ConfigNames } from '@antfu/eslint-config'
import { FlatConfigComposer } from 'eslint-flat-config-utils';

declare function configure (options?: OptionsConfig & Omit<TypedFlatConfigItem, 'files'>, ...userConfigs: Awaitable<TypedFlatConfigItem | TypedFlatConfigItem[] | FlatConfigComposer<any, any> | Linter.Config[]>[]): FlatConfigComposer<TypedFlatConfigItem, ConfigNames>
