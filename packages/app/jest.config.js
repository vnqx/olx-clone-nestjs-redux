module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
// "jest": {
//   "transform": {
//   },
//   "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.{jsx?|tsx?}?$",
//       "moduleFileExtensions": [
//     "ts",
//     "tsx",
//     "js",
//     "jsx",
//     "json",
//     "node"
//   ]
// }
