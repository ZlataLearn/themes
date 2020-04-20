const { isTitleForMap } = require("./isTitle");

const findTitle = (lines) =>
	lines
		.find(isTitleForMap(1))
		.slice(2)
		.trim();

module.exports = findTitle;
