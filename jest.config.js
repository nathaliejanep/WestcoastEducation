// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // transform: {
  //  '^.+\\.ts$': ['ts-jest', { useESM: true }],
  // },
  extensionsToTreatAsEsm: ['.ts'],
  testMatch: ['<rootDir>/src/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  transformIgnorePatterns: ['/node_modules/', '/dist/'],
};
