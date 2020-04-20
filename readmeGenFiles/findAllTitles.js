const { isTitleForMap } = require("./isTitle");
const { getSectionNameForLinks } = require("./utils");

const findAllTitles = (lines, level) =>
	lines
		.filter(isTitleForMap(level))
		.map((title) => title.slice(level + 1).trim())
		.map((title) => ({
			text: title,
			link: getSectionNameForLinks(title),
		}));

module.exports = findAllTitles;
