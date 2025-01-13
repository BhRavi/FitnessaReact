module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/solution/"],
  setupFiles: ["fake-indexeddb/auto"],
};
