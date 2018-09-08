// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The test environment that will be used for testing
  testEnvironment: "node",

  // File exts to parse
  moduleFileExtensions: [
    "js",
    "json",
    "vue"
  ],
  
  // for transpiling
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
  },

  // refs
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/source/$1"
  },

  // snapshots
  snapshotSerializers: [
    "<rootDir>/node_modules/jest-serializer-vue"
  ]

};