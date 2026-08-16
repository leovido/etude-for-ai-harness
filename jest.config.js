module.exports = {
	preset: "jest-expo",
	transformIgnorePatterns: [
		"node_modules/(?!(?:\\.pnpm/[^/]+/node_modules/)?((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-ng/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|msw|@mswjs/.*|until-async))",
	],
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	resolver: "<rootDir>/jest.resolver.js",
	collectCoverageFrom: [
		"app/**/*.{ts,tsx}",
		"components/**/*.{ts,tsx}",
		"!**/*.d.ts",
		"!**/node_modules/**",
	],
};
