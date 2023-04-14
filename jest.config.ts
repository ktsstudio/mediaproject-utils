import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const tsAliases = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: '<rootDir>/src/',
});

const config: Config = {
  verbose: false,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: tsAliases,
  modulePathIgnorePatterns: ['<rootDir>/src/__tests__/utils/'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};

export default config;
