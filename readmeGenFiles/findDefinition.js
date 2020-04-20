const { DEFINITION_LINE } = require("./constants");
const { isTitleForMap } = require("./isTitle");

const findIndex = (lines) => {
	const definitionTitleIndex = lines.findIndex((line) =>
		line.includes(DEFINITION_LINE)
	);
	if (definitionTitleIndex !== -1) {
		return definitionTitleIndex;
	}
	const fileTitleIndex = lines.findIndex(isTitleForMap(1));
	return fileTitleIndex;
};

const findDefinition = (lines) => {
	const index = findIndex(lines);
	if (index === -1) {
		return "";
	}
	return lines[index + 2].trim();
};

module.exports = findDefinition;
