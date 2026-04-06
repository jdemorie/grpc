/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(ts|tsx)$": [
            "ts-jest",
            {
                tsconfig: "<rootDir>/tsconfig.jest.json",
            },
        ],
    },
    setupFilesAfterEnv: ["<rootDir>/src/test/setupTests.ts"],
    testMatch: ["<rootDir>/src/**/*.test.(ts|tsx)"],
    moduleNameMapper: {
        // CSS modules / imports
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
};


