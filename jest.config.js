/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  resetMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ["**/src/**/*.[jt]s?(x)"],
};
