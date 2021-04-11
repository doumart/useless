module.exports = {
  globals: {
    "ts-jest": {
      isolatedModules: false,
    },
  },
  preset: "ts-jest",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/__jest__/*.test.ts?(x)"],
  testEnvironment: "jest-environment-jsdom-sixteen",
  //setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
};
