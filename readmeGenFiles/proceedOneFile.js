const { readFileP } = require("./utils");
const { README_FILENAME } = require("./constants");
const findDefinition = require("./findDefinition");
const findTitle = require("./findTitle");
const findAllTitles = require("./findAllTitles");
const findUnusedLinks = require("./findUnusedLinks");

const proceedOneFile = ({ files }) => async (currentFileName) => {
	if (currentFileName === README_FILENAME) {
		return false;
	}
	const data = await readFileP(currentFileName);
	const lines = data.split("\n");
	const title = findTitle(lines);
	const allTitles = findAllTitles(lines, 2);
	const definition = findDefinition(lines);
	const unusedLinks = findUnusedLinks({
		lines,
		files,
		title,
		currentFileName,
	});
	return {
		title,
		allTitles,
		filename: currentFileName,
		definition,
		unusedLinks,
	};
};

module.exports = proceedOneFile;
