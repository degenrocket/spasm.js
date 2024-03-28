module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // transform: {
  //   '^.+\\\\\\\\.tsx?$': 'ts-jest',
  //  modulePaths: ['<rootDir>/src.ts'],
  // moduleNameMapper: {
  //   '^src/(.*)$': '<rootDir>/src.ts/$1',
  // }, // },
  // The mapping below allows adding '.js' extension to import
  // statements, which is necessary for commonjs and esm to work
  moduleNameMapper: {
    "(.+)\\.js": "$1",
  },
};
