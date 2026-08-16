const NODE_CONDITION_PACKAGES = /(^|\/)(msw|@mswjs\/[^/]+)(\/|$)/;

module.exports = (request, options) => {
	const useNodeConditions = NODE_CONDITION_PACKAGES.test(request);

	return options.defaultResolver(request, {
		...options,
		conditions: useNodeConditions
			? ["node", "require", "default"]
			: options.conditions,
	});
};
