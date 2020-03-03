module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  coverageDirectory: './coverage/',
  collectCoverage: true,
  coveragePathIgnorePatterns: ['node_modules/']
};
