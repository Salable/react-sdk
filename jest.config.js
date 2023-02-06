const projectConfig = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
};

module.exports = {
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/*.test.[jt]s?(x)',
    '!**/index.[jt]s?(x)',
  ],
  projects: [
    {
      displayName: 'unit',
      testMatch: ['**/*.test.[jt]s?(x)', '!**/*.int.test.[jt]s?(x)'],
      modulePathIgnorePatterns: ['dist', 'cypress'],
      ...projectConfig,
    },
    {
      displayName: 'integration',
      testMatch: ['**/*.int.test.[jt]s?(x)'],
      modulePathIgnorePatterns: ['./__mocks__', './dist'],
      ...projectConfig,
    },
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};
