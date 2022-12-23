module.exports = {
    verbose: true,
    errorOnDeprecates: true,
    setupFiles: ["./src/setupTests.js"],
    coverageTreshold: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: -10,
    },
};