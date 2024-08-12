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
    /**
     * The solution below used to work, but then it broke
     * after installing "isomorphic-dompurify", which uses
     * "jsdom" as a dependency, which has "entities" as a
     * dependency, which gave an error because of this file:
     * <rootDir>/node_modules/entities/lib/decode.js
     * The current solution is to disable the line below and
     * simply test with "npm run test-commonjs".
     * There might be another solution to import/reexport all
     * functions without using ".js", e.g.:
     * import { sanitizeEvent } from './../utils/index';
     * instead of:
     * import { sanitizeEvent } from './../utils/index.js';
     * Then we can run tests with "npm run test-ts".
     * However, that solution needs some extra configuration
     * to transpile TypeScript to ESM without specifying
     * file extensions, because otherwise ESM doesn't work.
     */
    // "(.+)\\.js": "$1",

    // Other tried solutions, which did't work:
    // "src\\.ts/(.+)\\.js$": "$1",

    // "(.+)index\\.js": "$1",
    // "(.+)utils\\.js": "$1",
    // "(.+)nostrUtils\\.js": "$1",
    // "(.+)_events-data\\.js": "$1",

    // "^src\\.ts/utils/index\\.js$": "<rootDir>/src.ts/utils/index.ts",
    // "(.+)utils\\.js": "<rootDir>/src.ts/utils/utils.ts",
    // "(.+)nostrUtils\\.js": "<rootDir>/src.ts/utils/nostrUtils.ts",

    // Keep the .js extension for the problematic module
    // "^entities/lib/decode\\.js$": "<rootDir>/node_modules/entities/lib/decode.js",

    // Reintroduce a rule to handle .js files correctly
    // "\\.(js|jsx)$": "<rootDir>/node_modules/.cache/jest-transform-stub.js",

    // Handle .js files as modules
    // '\\.(js|jsx)$': '<rootDir>/transformer.js',
    // // transformer.js
    // module.exports = {
    //   process(src, filename) {
    //     return 'module.exports = ' + JSON.stringify({ default: src });
    //   },
    // };
  },
};
