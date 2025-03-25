/** @type {import('jest').Config} */
export default {
    coverageDirectory: '../coverage',
    moduleFileExtensions: ['js', 'json', 'ts'],
    moduleNameMapper: {
        '^@root/(.*)$': '<rootDir>/../src/$1',
    },
    rootDir: 'test',
    testEnvironment: 'node',
    testRegex: ['.*\\.test\\.ts$', '.*\\.e2e\\.ts$'],
    testTimeout: 30000,
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
};
